#!/bin/zsh

set -euo pipefail

cd "$(dirname "$0")"

port="${PORT:-4173}"

pids=()
pid_output="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"

if [[ -n "$pid_output" ]]; then
  pids=(${(f)pid_output})
fi

if (( ${#pids[@]} > 0 )); then
  echo "Stopping existing server on port $port: ${pids[*]}"
  kill "${pids[@]}"

  for _ in {1..20}; do
    if ! lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

if lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $port is still busy after attempting to stop the existing server."
  echo "Try a different port instead:"
  echo "  PORT=4174 ./serve-reset.sh"
  exit 1
fi

echo "Serving AutoDocLanding at http://127.0.0.1:$port/"
exec python3 dev_server.py --host 127.0.0.1 --port "$port"
