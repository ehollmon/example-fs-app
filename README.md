# Example Full-Stack App

This subfolder contains a minimal Express API and a Vite + React front-end that calls the API and renders the response on the root page.

## Layout
- `api/` – Express server exposing `/api/message`.
- `web/` – Vite React app that fetches from the API on load and shows the message.

## Running locally
### API
```sh
cd example-fs-app/api
npm install
npm run dev
# API listens on http://localhost:4000
```

### Front-end
```sh
cd example-fs-app/web
npm install
# Optional: point to a different API origin
# export VITE_API_BASE_URL=http://localhost:4000
npm run dev
# Front-end runs on http://localhost:5173
```

When both are running, open the front-end URL. It will call `GET /api/message` and display the JSON payload.
