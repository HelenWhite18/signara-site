#!/bin/bash
# Run this on your Mac from the repo root: ./fetch-assets.sh
# Downloads the binary assets from the live site into the repo.
set -e
cd "$(dirname "$0")"
for f in og-image.png pulse-og.png favicon.ico apple-touch-icon.png; do
  echo "Fetching $f ..."
  curl -fsSLo "$f" "https://thesignara.com/$f" || echo "  (skipped — $f not found on live site)"
done
echo "Done. Verify the files, then: git add -A && git commit -m 'Add binary assets'"
