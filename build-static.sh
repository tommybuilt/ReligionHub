#!/bin/bash
set -e

echo "=== ReligionHub Static Build for Cloudflare Pages ==="

# Step 1: Run standard Next.js build
echo ">>> Running next build..."
npm run build

# Step 2: Assemble static output
OUT_DIR=".open-next/assets"
echo ">>> Assembling static output in $OUT_DIR..."
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR/_next"

# Copy static JS/CSS chunks
echo ">>> Copying _next/static assets..."
cp -r .next/static "$OUT_DIR/_next/static"

# Debug: show full .next/server/app structure
echo ">>> Full .next/server/app structure (HTML files):"
find .next/server/app -name '*.html' -type f 2>/dev/null || echo "(none found)"
echo ">>> Full .next/server/app structure (all files, first 50):"
find .next/server/app -type f | head -50
echo "---"

# Step 3: Copy ALL pre-rendered content from .next/server/app/
# This copies the entire tree including HTML, RSC, manifests, etc.
echo ">>> Copying entire .next/server/app/ tree..."
if [ -d ".next/server/app" ]; then
  cp -r .next/server/app/* "$OUT_DIR/" 2>/dev/null || true
fi

# Step 4: Rename all page.html → index.html for Cloudflare Pages compatibility
echo ">>> Renaming page.html → index.html..."
find "$OUT_DIR" -name 'page.html' -type f | while read f; do
  dir="$(dirname "$f")"
  mv "$f" "$dir/index.html"
  echo "  Renamed: ${f#$OUT_DIR/} → ${dir#$OUT_DIR/}/index.html"
done

# Step 5: Handle _not-found → 404.html
echo ">>> Setting up 404 page..."
if [ -f "$OUT_DIR/_not-found/index.html" ]; then
  cp "$OUT_DIR/_not-found/index.html" "$OUT_DIR/404.html"
  echo "  Created 404.html from _not-found/index.html"
elif [ -f "$OUT_DIR/_not-found.html" ]; then
  cp "$OUT_DIR/_not-found.html" "$OUT_DIR/404.html"
  echo "  Created 404.html from _not-found.html"
fi

# Step 6: Handle robots.txt and sitemap.xml .body files
echo ">>> Checking for robots.txt and sitemap.xml..."
for f in robots.txt sitemap.xml; do
  if [ -f "$OUT_DIR/$f.body" ]; then
    mv "$OUT_DIR/$f.body" "$OUT_DIR/$f"
    echo "  $f from .body file"
  elif [ -d "$OUT_DIR/$f" ] && [ -f "$OUT_DIR/$f/route.body" ]; then
    cp "$OUT_DIR/$f/route.body" "$OUT_DIR/$f.tmp"
    rm -rf "$OUT_DIR/$f"
    mv "$OUT_DIR/$f.tmp" "$OUT_DIR/$f"
    echo "  $f from route.body"
  fi
done

# Step 7: Create _redirects (locale redirect: / → /en/)
cat > "$OUT_DIR/_redirects" << 'EOF'
/ /en/ 302
EOF

# Step 8: Create _headers (security)
cat > "$OUT_DIR/_headers" << 'EOF'
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
EOF

# Final summary
echo ""
echo "=== BUILD COMPLETE ==="
echo "Total index.html files: $(find "$OUT_DIR" -name 'index.html' -type f | wc -l)"
echo "Total files in output: $(find "$OUT_DIR" -type f | wc -l)"
echo ""
echo "Sample index.html paths (first 20):"
find "$OUT_DIR" -name 'index.html' -type f | sed "s|$OUT_DIR||" | head -20
echo ""
echo "Top-level contents:"
ls -la "$OUT_DIR/"
