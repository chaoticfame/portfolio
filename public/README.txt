About-page photo workflow:

1. Drop your source photo here as:  portrait.png  (square or 4:5 works best)
2. Optimize it:  node scripts/optimize-portrait.mjs
   -> generates portrait.webp (downscaled to 900px, ~30 KB)
3. /about serves portrait.webp via next/image (see lib/data.ts -> about.portrait)

Notes:
- It is automatically rendered in a monochrome / halftone style.
- If the file is missing, the About page shows your initials ("DE") as a placeholder.
