// src/server.js
//
// WHY THIS FILE EXISTS:
// This file CREATES and CONFIGURES the Express app, but does NOT start it.
//
// WHY IS THIS SEPARATE FROM index.js?
// In tests, you need the app object to send fake requests to it.
// If app.listen() was in here, every test would start a real server,
// fight over ports, and run slowly. By separating creation from startup,
// tests import this file and get a configured app without side effects.

const express = require('express');

const app = express();

// Parse JSON request bodies
// Without this, req.body is undefined when someone sends JSON to your API
app.use(express.json());

module.exports = app;
