// index.js
//
// WHY THIS FILE EXISTS:
// This is the entry point — the file you run with `node index.js`.
// Its ONLY job is to import the configured app and start listening.
//
// WHY IS THIS SEPARATE FROM src/server.js?
// src/server.js creates and configures the app.
// index.js starts it.
// In tests, you import src/server.js (the app) WITHOUT starting a real server.
// If app.listen() was in src/server.js, every test would fight over the port.

// Config must be imported FIRST — it loads .env and validates variables.
// If a required variable is missing, the app crashes here, not later.
const config = require('./src/config');
const app = require('./src/server');

app.listen(config.port, () => {
  console.log(`Atlas server running on port ${config.port} [${config.nodeEnv}]`);
});
