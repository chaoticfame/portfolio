// One-off image optimizer for the About-page portrait.
// Usage: node scripts/optimize-portrait.mjs
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/portrait.png");
const OUT = path.resolve("public/portrait.webp");
// Displayed at ~320px wide; 2x for retina => ~640px. 900px gives headroom.
const MAX_WIDTH = 900;

async function sizeKB(file) {
  const { size } = await stat(file);
  return (size / 1024).toFixed(1);
}

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height} (${await sizeKB(SRC)} KB)`);

await sharp(SRC)
  .rotate() // respect EXIF orientation
  .resize({ width: Math.min(MAX_WIDTH, meta.width), withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(OUT);

const outMeta = await sharp(OUT).metadata();
console.log(`output: ${outMeta.width}x${outMeta.height} (${await sizeKB(OUT)} KB)`);
console.log("wrote public/portrait.webp");
