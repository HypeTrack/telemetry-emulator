const http = require('http')
const { networkInterfaces } = require('os')

const instructions = () => `
Listening on port {port}. Your local IP should be {ip}. (If you're not sure this is correct, use your OS-specific method to get your local IP address.)

To use this telemetry server, you can:
- Set up Charles Proxy to rewrite the body of https://api-quiz.hype.space/config/public to set the "host" property to "http://{ip}:{port}"
- Save a local copy of the config file at https://api-quiz.hype.space/config/public and set the "host" property to "http://{ip}:{port}", and use Map Local in Charles Proxy.
`.replaceAll('{port}', 8080).replaceAll('{ip}', getLocalIP())

// Works on my machine!
function getLocalIP () {
    return []
      .concat(...Object.values(networkInterfaces()))
      .filter((i) => i.family === "IPv4" && !i.internal)[0]?.address
}

function isJson (string) {
    try {
        JSON.parse(string)
    } catch (e) {
        return false
    }

    return true
}

/** @type {import('http').RequestListener} */
const listener = async (req, res) => {
    if (req.method === 'POST') {
        // Handle post request.
        let body = ''

        req.on('data', chunk => body += chunk.toString())

        req.on('end', () => {
            if (!isJson(body)) {
                console.log('Body (not JSON):', body)
            } else console.log('JSON Body:', JSON.parse(body))
        })
    }

    res.end()
}

const server = http.createServer(listener)
server.listen(8080, () => console.log(instructions()))