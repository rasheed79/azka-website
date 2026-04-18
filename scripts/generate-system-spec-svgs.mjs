import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'systems', 'specs');

const colors = {
  hr: ['#3b82f6', '#1e40af'],
  attendance: ['#a855f7', '#6b21a8'],
  financial: ['#10b981', '#047857'],
  archiving: ['#f97316', '#c2410c'],
  procurement: ['#f43f5e', '#9f1239'],
  communications: ['#14b8a6', '#0f766e'],
  warehouse: ['#eab308', '#a16207'],
  'self-service': ['#ec4899', '#9d174d'],
  biometric: ['#6366f1', '#3730a3'],
  access: ['#06b6d4', '#0e7490'],
  mobile: ['#8b5cf6', '#5b21b6'],
  integration: ['#0ea5e9', '#0369a1'],
};

function svg1(c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="640" height="360" rx="14" fill="url(#g)"/><rect x="48" y="218" width="140" height="86" rx="10" fill="#fff" opacity=".22"/><rect x="206" y="178" width="140" height="126" rx="10" fill="#fff" opacity=".32"/><rect x="364" y="138" width="140" height="166" rx="10" fill="#fff" opacity=".42"/><rect x="522" y="198" width="90" height="106" rx="10" fill="#fff" opacity=".26"/></svg>`;
}

function svg2(c1, c2) {
  let circles = '';
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      circles += `<circle cx="${72 + c * 80}" cy="${68 + r * 72}" r="22" fill="#fff" opacity=".22"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="1" y1="0" x2="0" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="640" height="360" rx="14" fill="url(#g)"/>${circles}<rect x="180" y="240" width="280" height="56" rx="12" fill="#fff" opacity=".28"/></svg>`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const [slug, [c1, c2]] of Object.entries(colors)) {
  fs.writeFileSync(path.join(outDir, `${slug}-1.svg`), svg1(c1, c2));
  fs.writeFileSync(path.join(outDir, `${slug}-2.svg`), svg2(c1, c2));
}
console.log('Wrote', Object.keys(colors).length * 2, 'files to', path.relative(root, outDir));
