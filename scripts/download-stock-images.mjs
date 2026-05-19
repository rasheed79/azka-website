/**
 * Downloads Unsplash hero background used by components/sections/Hero.tsx.
 * System detail galleries use either custom PNGs or in-page illustrations (see lib/systems.ts).
 * Run from repo root: node scripts/download-stock-images.mjs
 * Re-download even when file exists: node scripts/download-stock-images.mjs --force
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'images', 'stock');
const force = process.argv.includes('--force');

const u = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

const heroUrl = u('photo-1486406146926-c627a92ad1ab', 1920);
const dest = path.join(outDir, 'site-hero-bg.jpg');

fs.mkdirSync(outDir, { recursive: true });

const license = `Photos sourced from Unsplash (https://unsplash.com/license).\nDo not use these files to build a competing image service.\n`;

if (!force && fs.existsSync(dest)) {
  console.log('skip exists site-hero-bg.jpg');
} else {
  const res = await fetch(heroUrl);
  if (!res.ok) {
    console.error('FAIL', res.status, heroUrl);
    process.exitCode = 1;
  } else {
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log('wrote site-hero-bg.jpg', buf.length);
  }
}

fs.writeFileSync(path.join(outDir, 'LICENSE.txt'), license);
console.log('done →', outDir);
