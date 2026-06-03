#!/bin/zsh

set -euo pipefail

cd "$(dirname "$0")"

port="${PORT:-4173}"

if lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $port is already in use."
  echo "If the site is already open in Codex, keep using: http://127.0.0.1:$port/"
  echo "Otherwise stop the existing server first, or run with a different port:"
  echo "  PORT=4174 ./serve.sh"
  exit 0
fi

echo "Serving AutoDocLanding at http://127.0.0.1:$port/"
exec python3 dev_server.py --host 127.0.0.1 --port "$port"
