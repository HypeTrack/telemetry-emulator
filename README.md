# telemetry-emulator

A super simple, no dependencies telemetry server emulator for HQ Trivia.

## Why use this?

When I was developing a custom HQ Trivia server/WebSocket implementation, I realized that whenever I made a mistake in my payloads it would actually send that error to the telemetry server hosted by HQ.

The problem was that:
1. That made it pretty clear to HQ that I was playing around w/ the app and trying to reverse engineer it.
1. The app was actually sending error information back to HQ, which would be helpful when trying to debug my code.

So the reason for running this is two-fold: preventing HQ from knowing that you're reverse engineering the app (not really a concern anymore), and collecting error information to debug your own code.

## Instructions

1. Clone the repository
1. `npm start` / `yarn start`
1. Create a rewrite rule which updates the telemetry entry in the API configuration to point to your local server.

When done correctly, you should be seeing telemetry logs in the console.

## License

MIT