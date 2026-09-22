#!/usr/bin/env python3
"""Smoke-check the built site: local assets exist, and current pages avoid retired claims."""
from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
RETIRED = (
    "five categories",
    "organized into five",
    "identifies speakers",
    "speaker diarization",
    "speaker-diarization",
    "nothing leaves",
    "Nothing in the cloud",
    "never leaves",
    "nothing important gets dropped",
    "Speaker 1",
    "Speaker 2",
    "Windows coming soon",
    "meeting-review.png",
    "autodoc-core-features-demo.mp4",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "bad or exploitative",
)
PAGES = (
    "index.html",
    "features.html",
    "faq.html",
    "about.html",
    "privacy.html",
    "terms.html",
    "granola-alternative.html",
    "download-mac.html",
    "download-windows.html",
    "404.html",
)
ATTR = re.compile(r'''(?:src|href)=["']([^"']+)["']''', re.I)
failures: list[str] = []

def local_target(page: Path, url: str) -> Path | None:
    if url.startswith(("#", "mailto:", "data:", "http://", "https://")):
        return None
    path = url.split("#", 1)[0].split("?", 1)[0]
    if not path:
        return None
    if path.startswith("/"):
        # Clean routes and root assets.
        candidate = DIST / path.lstrip("/")
        if candidate.suffix:
            return candidate
        html = DIST / f"{path.strip('/')}.html"
        if html.exists():
            return html
        return None
    return (page.parent / path).resolve()

for name in PAGES:
    page = DIST / name
    if not page.is_file() or page.stat().st_size == 0:
        failures.append(f"missing page {name}")
        continue
    text = page.read_text(encoding="utf-8", errors="replace")
    lowered = text.lower()
    for phrase in RETIRED:
        if phrase.lower() in lowered:
            failures.append(f"{name} contains retired claim: {phrase}")
    if name in {"index.html", "granola-alternative.html", "features.html", "faq.html", "about.html", "privacy.html"}:
        if "autodoc-v1.2-1200x630.png" not in text:
            failures.append(f"{name} missing social image metadata")
        if 'rel="canonical"' not in text:
            failures.append(f"{name} missing canonical")
    for url in ATTR.findall(text):
        target = local_target(page, url)
        if target is None:
            continue
        if not target.is_file() or target.stat().st_size == 0:
            failures.append(f"{name} missing asset {url}")

sitemap = DIST / "sitemap.xml"
try:
    tree = ET.parse(sitemap)
except ET.ParseError as error:
    failures.append(f"sitemap parse error: {error}")
else:
    locs = [node.text or "" for node in tree.findall(".//{*}loc")]
    if "https://getautodoc.com/granola-alternative" not in locs:
        failures.append("sitemap missing comparison URL")
    if len(locs) < 7:
        failures.append(f"sitemap has {len(locs)} urls, expected at least 7")

robots = (DIST / "robots.txt").read_text() if (DIST / "robots.txt").exists() else ""
if "Disallow: /" in robots and "Allow" not in robots:
    failures.append("robots.txt blocks the whole site")

for needle in ("docs/", "final/", ".env", "/Users/"):
    for page in DIST.glob("*.html"):
        if needle in page.read_text(encoding="utf-8", errors="replace"):
            failures.append(f"{page.name} contains private path marker {needle}")

if failures:
    print("\n".join(failures))
    sys.exit(1)
print(f"Site smoke check passed for {len(PAGES)} pages.")
