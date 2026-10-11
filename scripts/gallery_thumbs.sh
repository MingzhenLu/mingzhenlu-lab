#!/bin/bash
# 800 px wide JPEG thumbnails of static/images/gallery/photo-* into static/images/gallery/thumbs/.
# The gallery grid shows the thumbnail, the lightbox opens the full photo. A photo already 800 px wide or
# less gets no thumbnail (the page falls back to the original). Up-to-date thumbnails are skipped. macOS sips.
set -euo pipefail
cd "$(dirname "$0")/.."
src=static/images/gallery
out=$src/thumbs
width=800
mkdir -p "$out"
for f in "$src"/photo-*; do
  stem=$(basename "${f%.*}")
  w=$(sips -g pixelWidth "$f" | awk '/pixelWidth/{print $2}')
  [ "$w" -le "$width" ] && continue
  [ "$out/$stem.jpg" -nt "$f" ] && continue
  sips --resampleWidth "$width" -s format jpeg -s formatOptions 78 "$f" --out "$out/$stem.jpg" >/dev/null
  echo "thumb: $stem.jpg"
done
