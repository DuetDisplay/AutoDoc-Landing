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
copy_clean privacy.html dist/privacy.html
copy_clean _redirects dist/_redirects
copy_clean terms.html dist/terms.html
copy_clean 404.html dist/404.html
copy_clean robots.txt dist/robots.txt
copy_clean sitemap.xml dist/sitemap.xml
copy_clean google650f43ebf7806a61.html dist/google650f43ebf7806a61.html
copy_clean _headers dist/_headers

copy_clean css/style.css dist/css/style.css
copy_clean js/main.js dist/js/main.js

copy_clean assets/screenshots/dashboard.png dist/assets/screenshots/dashboard.png
copy_clean assets/screenshots/meeting-review.png dist/assets/screenshots/meeting-review.png
copy_clean assets/screenshots/search-page.png dist/assets/screenshots/search-page.png
copy_clean assets/screenshots/transcript-view.png dist/assets/screenshots/transcript-view.png

copy_clean assets/duet-logo.png dist/assets/duet-logo.png
copy_clean assets/videos/autodoc-core-features-demo.mp4 dist/assets/videos/autodoc-core-features-demo.mp4

find dist \( -name '._*' -o -name '.__*' \) -type f -delete 2>/dev/null || true
