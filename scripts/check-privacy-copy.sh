#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
privacy_file="$repo_root/privacy.html"

grep -Fq 'Analytics and crash reporting are opt-in' "$privacy_file"
grep -Fq 'Diagnostic log uploads are separate and optional' "$privacy_file"
grep -Fq 'sanitized tail of recent app logs to error reports' "$privacy_file"
grep -Fq 'Meeting content is not diagnostics payload' "$privacy_file"
grep -Fq 'Optional analytics, crash reporting, and technical log uploads.' "$privacy_file"

echo "Privacy copy check passed."
