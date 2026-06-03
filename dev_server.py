#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
EXCLUDED_DIRS = {".git", ".wrangler", "__pycache__"}
CLEAN_URLS = {
    "/features": "features.html",
    "/about": "about.html",
    "/privacy": "privacy.html",
    "/terms": "terms.html",
    "/faq": "faq.html",
}
EXCLUDED_FILE_PREFIXES = ("._",)
HTML_CONTENT_TYPES = ("text/html", "application/xhtml+xml")


def latest_mtime_ns() -> int:
    newest = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [
            dirname
            for dirname in dirnames
            if dirname not in EXCLUDED_DIRS and not dirname.startswith(".")
        ]

        for filename in filenames:
            if filename.startswith(EXCLUDED_FILE_PREFIXES):
                continue

            path = Path(dirpath, filename)
            try:
                stat = path.stat()
            except FileNotFoundError:
                continue

            newest = max(newest, stat.st_mtime_ns)

    return newest


def livereload_snippet() -> bytes:
    script = """
<script>
(() => {
  let lastSeen = 0;

  async function poll() {
    try {
      const response = await fetch(`/__codex_reload__?since=${lastSeen}`, {
        cache: "no-store",
      });
      const payload = await response.json();

      if (payload.version > lastSeen) {
        if (lastSeen !== 0 && payload.changed) {
          window.location.reload();
          return;
        }
        lastSeen = payload.version;
      }
    } catch (error) {
      console.debug("Live reload poll failed", error);
    }

    window.setTimeout(poll, 1000);
  }

  poll();
})();
</script>
""".strip()
    return script.encode("utf-8")


class DevServerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory: str | None = None, **kwargs):
        super().__init__(*args, directory=str(ROOT if directory is None else directory), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/__codex_reload__":
            self.handle_reload_probe(parsed.query)
            return

        mapped = CLEAN_URLS.get(parsed.path.rstrip("/") if parsed.path != "/" else parsed.path)
        if mapped is not None:
            self.path = f"/{mapped}{('?' + parsed.query) if parsed.query else ''}"

        super().do_GET()

    def handle_reload_probe(self, query: str) -> None:
        params = parse_qs(query)
        since_raw = params.get("since", ["0"])[0]
        try:
            since = int(since_raw)
        except ValueError:
            since = 0

        version = latest_mtime_ns()
        payload = {
            "changed": version > since,
            "version": version,
        }
        body = json.dumps(payload).encode("utf-8")

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        content_type = self.guess_type(path)
        if not any(content_type.startswith(prefix) for prefix in HTML_CONTENT_TYPES):
            return super().send_head()

        try:
            with open(path, "rb") as file:
                original = file.read()
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "File not found")
            return None

        injection = livereload_snippet()
        closing_tag = b"</body>"
        lower_original = original.lower()
        index = lower_original.rfind(closing_tag)
        if index != -1:
            body = original[:index] + injection + b"\n" + original[index:]
        else:
            body = original + b"\n" + injection + b"\n"

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        return self._as_file_like(body)

    @staticmethod
    def _as_file_like(body: bytes):
        from io import BytesIO

        return BytesIO(body)


def main() -> None:
    parser = argparse.ArgumentParser(description="Local dev server with live reload")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=int(os.environ.get("PORT", "4173")), type=int)
    args = parser.parse_args()

    try:
        server = ThreadingHTTPServer((args.host, args.port), DevServerHandler)
    except PermissionError:
        print(
            f"Could not bind to http://{args.host}:{args.port}/. "
            "If you launched this from a Codex project action, the action may be sandboxed "
            "and not allowed to open a local listening port."
        )
        raise SystemExit(1)

    print(f"Serving AutoDocLanding at http://{args.host}:{args.port}/")
    server.serve_forever()


if __name__ == "__main__":
    main()
