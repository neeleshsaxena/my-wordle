# my-wordle

A small browser-based Wordle clone built as a weekend hobby project. You get a fixed number of tries to guess a secret 5-letter word, with classic green / yellow / red feedback after each guess.

The repo is split into a React front-end (`client/`) and a tiny Express server (`server/`) that serves the built client in production.

## How to play

1. The app shows a grid of empty letter cells. The current cell is auto-focused.
2. Type any letter A–Z. Focus advances to the next cell automatically; when you fill the last cell in a row, the guess is submitted and the row is evaluated.
3. After each guess the cells are colored:
   - **Green** — letter is correct and in the right position.
   - **Yellow** — letter is in the word but in a different position.
   - **Red** — letter is not in the word.
4. You have as many attempts as there are letters in the word (5 attempts for the default 5-letter word). Solve it before you run out of rows to win. Use the refresh icon to start over.

> Note: in this version the secret word is hardcoded to `APPLE` in `client/src/App.js`. There is commented-out code that integrates with the RapidAPI WordsAPI to fetch a random word — drop in your own API key to enable it.

## Tech stack

React 17 (Create React App / react-scripts 5) on the client, Express 4 on the server, FontAwesome for icons, Axios for HTTP.

## Getting started

Clone the repo and install both the root and client dependencies:

```bash
git clone https://github.com/neeleshsaxena/my-wordle.git
cd my-wordle
npm install
cd client && npm install && cd ..
```

### Run the React app in development (recommended for hacking)

```bash
cd client
npm start
```

This starts the CRA dev server on [http://localhost:3000](http://localhost:3000) with hot reload. The client's `package.json` already proxies API calls to `http://localhost:3001`, so you can run the Express server alongside it if you need to.

### Run the production build via Express

```bash
npm run build   # builds the client into client/build
npm start       # starts Express on http://localhost:3001
```

The Express server (`server/index.js`) serves the static React build and falls back to `index.html` for client-side routes. The port can be overridden with the `PORT` environment variable.

## Available scripts

Run from the repo root:

- `npm start` — starts the Express server (serves `client/build` on port 3001).
- `npm run build` — installs client dependencies and produces a production build under `client/build`.

Run from inside `client/` (standard CRA scripts):

- `npm start` — CRA dev server on port 3000.
- `npm run build` — production build.
- `npm test` — Jest / React Testing Library in watch mode.
- `npm run eject` — eject from Create React App (one-way).

## Notes

- If `npm start` inside `client/` fails on a modern Node version with an OpenSSL / `digital envelope routines::unsupported` error (common on Node 17+ with older react-scripts), run it with the legacy provider flag:

  ```bash
  NODE_OPTIONS=--openssl-legacy-provider npm start
  ```

- To enable random words, uncomment the `axios` block in `client/src/App.js`, add your RapidAPI key/host, and remove the `setWord('APPLE')` line.
