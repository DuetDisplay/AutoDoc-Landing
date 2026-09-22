#!/bin/zsh

set -euo pipefail

cd "$(dirname "$0")/.."

export COPYFILE_DISABLE=1

mkdir -p dist

find dist -mindepth 1 -delete 2>/dev/null || true

mkdir -p dist/css
mkdir -p dist/js
mkdir -p dist/assets/screenshots
mkdir -p dist/assets/videos
mkdir -p dist/assets/social
mkdir -p dist/assets/fonts

copy_clean() {
  if command -v ditto >/dev/null 2>&1; then
    ditto --norsrc "$1" "$2"
  else
    cp "$1" "$2"
  fi
}

copy_clean index.html dist/index.html
copy_clean about.html dist/about.html
copy_clean features.html dist/features.html
copy_clean faq.html dist/faq.html
copy_clean granola-alternative.html dist/granola-alternative.html
copy_clean privacy.html dist/privacy.html
copy_clean terms.html dist/terms.html
copy_clean download-mac.html dist/download-mac.html
copy_clean download-windows.html dist/download-windows.html
copy_clean 404.html dist/404.html
copy_clean robots.txt dist/robots.txt
copy_clean sitemap.xml dist/sitemap.xml
copy_clean google650f43ebf7806a61.html dist/google650f43ebf7806a61.html
copy_clean _headers dist/_headers

copy_clean css/style.css dist/css/style.css
copy_clean js/main.js dist/js/main.js

copy_clean assets/screenshots/notes-v1.2.png dist/assets/screenshots/notes-v1.2.png
copy_clean assets/screenshots/calendar-v1.2.png dist/assets/screenshots/calendar-v1.2.png
copy_clean assets/screenshots/ask-ai-v1.2.png dist/assets/screenshots/ask-ai-v1.2.png
copy_clean assets/screenshots/transcript-playback-v1.2.png dist/assets/screenshots/transcript-playback-v1.2.png
copy_clean assets/screenshots/search-v1.2.png dist/assets/screenshots/search-v1.2.png
copy_clean assets/screenshots/export-menu-v1.2.png dist/assets/screenshots/export-menu-v1.2.png
copy_clean assets/screenshots/windows-notes-v1.2.png dist/assets/screenshots/windows-notes-v1.2.png
copy_clean assets/screenshots/poster-app-only-v1.2.png dist/assets/screenshots/poster-app-only-v1.2.png

copy_clean assets/duet-logo.png dist/assets/duet-logo.png
copy_clean assets/videos/autodoc-demo-v1.2.mp4 dist/assets/videos/autodoc-demo-v1.2.mp4
copy_clean assets/social/autodoc-v1.2-1200x630.png dist/assets/social/autodoc-v1.2-1200x630.png

copy_clean assets/fonts/InterVariable.woff2 dist/assets/fonts/InterVariable.woff2
copy_clean assets/fonts/InterVariable-Italic.woff2 dist/assets/fonts/InterVariable-Italic.woff2
copy_clean assets/fonts/Inter-LICENSE.txt dist/assets/fonts/Inter-LICENSE.txt
copy_clean assets/fonts/JetBrainsMono-Regular.woff2 dist/assets/fonts/JetBrainsMono-Regular.woff2
copy_clean assets/fonts/JetBrainsMono-Medium.woff2 dist/assets/fonts/JetBrainsMono-Medium.woff2
copy_clean assets/fonts/JetBrainsMono-SemiBold.woff2 dist/assets/fonts/JetBrainsMono-SemiBold.woff2
copy_clean assets/fonts/JetBrainsMono-OFL.txt dist/assets/fonts/JetBrainsMono-OFL.txt

find dist \( -name '._*' -o -name '.__*' \) -type f -delete 2>/dev/null || true
