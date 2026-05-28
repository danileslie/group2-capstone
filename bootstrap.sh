#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# bootstrap.sh — PeerConnect project setup
# Run from the repo root on a fresh Ubuntu 22.04 instance.
# Requires: node, npm already installed.
# ---------------------------------------------------------------------------

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log()  { echo "[bootstrap] $*"; }
fail() { echo "[bootstrap] ERROR: $*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Preflight checks
# ---------------------------------------------------------------------------

[ -f "$REPO_ROOT/server/.env" ] \
  || fail "server/.env not found. Copy .env.example first:\n  cp .env.example server/.env"

[ -f "$REPO_ROOT/server/package-lock.json" ] \
  || fail "server/package-lock.json missing. Run 'npm install' in server/ first to generate it."

[ -f "$REPO_ROOT/client/package-lock.json" ] \
  || fail "client/package-lock.json missing. Run 'npm install' in client/ first to generate it."

# ---------------------------------------------------------------------------
# Install dependencies
# ---------------------------------------------------------------------------

log "Installing server dependencies..."
npm ci --prefix "$REPO_ROOT/server"

log "Installing client dependencies..."
npm ci --prefix "$REPO_ROOT/client"

# ---------------------------------------------------------------------------
# Database migrations
# (MongoDB/Mongoose is schema-less — no migration step required)
# ---------------------------------------------------------------------------

log "No migrations to run (schema-less MongoDB)."

# ---------------------------------------------------------------------------
# Seed database (non-production only)
# ---------------------------------------------------------------------------

NODE_ENV="${NODE_ENV:-development}"

if [ "$NODE_ENV" = "production" ]; then
  log "NODE_ENV=production — skipping seed."
else
  log "NODE_ENV=$NODE_ENV — running seed..."
  node "$REPO_ROOT/server/src/db/seed.js"
fi

# ---------------------------------------------------------------------------

log "Bootstrap complete."
