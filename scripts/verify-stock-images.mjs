/**
 * Ensures image paths referenced by lib/systems.ts exist on disk.
 * Run: node scripts/verify-stock-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const required = [
  'images/stock/site-hero-bg.jpg',
  'images/الربط والتكامل.png',
  'images/الحضور والانصراف.png',
  'images/الموارد البشرية.png',
  'images/النظام المالي.png',
  'images/الميزانية.png',
  'images/الارشيف الالكتروني.png',
  'images/المشتريات والعقود.png',
  'images/الاتصالات الادارية.png',
  'images/المستودعات.png',
  'images/الخدمات الالكترونية.png',
  'images/البصمة الحيوية.png',
  'images/تصاريح الدخول.png',
  'images/تطبيقات جوال.png',
  'images/صورة نظام المالية داخلي 1.png',
  'images/صورة نظام المالية داخلي 2.png',
  'images/صور نظام الحصور والانصراف الداخلية 1.png',
  'images/صور نظام الحصور والانصراف الداخلية 2.png',
  'images/صورة نظام الميزانية الداخلية 1.png',
  'images/صورة نظام الميزانية الداخلية 2.png',
  'images/صورة نظام الميزانية الداخلية 3.png',
];

let bad = 0;
for (const rel of required) {
  const abs = path.join(publicDir, rel);
  if (!fs.existsSync(abs)) {
    console.error('MISSING', rel);
    bad++;
    continue;
  }
  const st = fs.statSync(abs);
  if (st.size < 5000) {
    console.error('SUSPICIOUSLY_SMALL', rel, st.size);
    bad++;
  } else {
    console.log('ok', rel, st.size);
  }
}

if (bad) {
  console.error(`\n${bad} problem(s).`);
  process.exit(1);
}
console.log('\nAll referenced image files present.');
