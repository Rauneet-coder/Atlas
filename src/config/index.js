// src/config/index.js
//
// WHY THIS FILE EXISTS:
// This is the SINGLE source of truth for all configuration in Atlas.
// Every part of the app imports config from here — never reads process.env directly.
//
// WHY NOT JUST USE process.env EVERYWHERE?
// 1. If 15 files all read process.env.DATABASE_URL, and you rename it,
//    you have to find and fix all 15. With this module, you change it once.
// 2. This module VALIDATES config on startup. If DATABASE_URL is missing,
//    the app crashes immediately with a clear error — not 10 minutes later
//    when the first database query fails with a confusing error.
// 3. You can provide sensible defaults for development without littering
//    fallback values across every file.
//
// HOW REAL COMPANIES DO THIS:
// Stripe, Netflix, and Uber all have config modules that validate on startup.
// The principle is called "fail fast" — if something is wrong, crash immediately
// with a clear message. Don't limp along and crash later with a confusing error.

const dotenv = require('dotenv');

// Load .env file in development
// In production, env vars are set by the deployment platform (not a file)
dotenv.config();

// List of environment variables that MUST be present.
// If any of these are missing, the app refuses to start.
const requiredVars = ['DATABASE_URL'];

// Check for missing required variables
const missing = requiredVars.filter((varName) => !process.env[varName]);

if (missing.length > 0) {
  // This is a deliberate crash. It's better to NOT start than to start broken.
  console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill in the values.');
  process.exit(1);
}

// The config object that the rest of the app uses.
// Notice: every value has a clear name, and optional values have defaults.
const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,

  // Derived values — computed from other config
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = config;
