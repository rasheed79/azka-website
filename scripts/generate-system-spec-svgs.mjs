/**
 * Generates UI-like SVG mockups for each system (2 per slug).
 * Run: node scripts/generate-system-spec-svgs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'systems', 'specs');

const accent = {
  hr: '#2563eb',
  attendance: '#9333ea',
  financial: '#059669',
  archiving: '#ea580c',
  procurement: '#e11d48',
  communications: '#0d9488',
  warehouse: '#ca8a04',
  'self-service': '#db2777',
  biometric: '#4f46e5',
  access: '#0891b2',
  mobile: '#7c3aed',
  integration: '#0284c7',
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** App window: title bar + white content canvas */
function mockScreen(title, accentColor, inner) {
  const W = 720;
  const H = 400;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <filter id="sd" x="-15%" y="-15%" width="130%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0f172a" flood-opacity=".22"/></filter>
</defs>
<rect x="12" y="12" width="${W - 24}" height="${H - 24}" rx="14" fill="#334155" filter="url(#sd)"/>
<rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="10" fill="#ffffff"/>
<rect x="20" y="20" width="${W - 40}" height="44" rx="10" fill="#0f172a"/>
<rect x="20" y="20" width="5" height="44" rx="10 0 0 10" fill="${accentColor}"/>
<circle cx="42" cy="42" r="4.5" fill="#ef4444"/><circle cx="58" cy="42" r="4.5" fill="#eab308"/><circle cx="74" cy="42" r="4.5" fill="#22c55e"/>
<text x="96" y="47" fill="#f1f5f9" font-family="Segoe UI,system-ui,sans-serif" font-size="14" font-weight="600">${esc(title)}</text>
<g transform="translate(28 78)">${inner}</g>
</svg>`;
}

function textBar(x, y, w, h, fill = '#e2e8f0') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}"/>`;
}

function screens(slug, a) {
  const builders = {
    hr: () => [
      mockScreen('HR — Employee directory', a, `
${textBar(0, 0, 180, 10, '#64748b')}
${textBar(190, 0, 80, 10, '#64748b')}
${textBar(280, 0, 100, 10, '#64748b')}
${textBar(390, 0, 90, 10, '#64748b')}
${[0, 1, 2, 3, 4, 5]
  .map(
    (i) => `
<rect x="0" y="${18 + i * 42}" width="664" height="38" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
<circle cx="24" cy="${37 + i * 42}" r="14" fill="${a}" opacity=".35"/>
${textBar(48, 26 + i * 42, 140, 12)}
${textBar(200, 26 + i * 42, 70, 12, a)}
${textBar(290, 26 + i * 42, 160, 12)}
${textBar(470, 28 + i * 42, 56, 10, '#bbf7d0')}`
  )
  .join('')}
`),
      mockScreen('HR — Profile & leave', a, `
<rect x="0" y="0" width="220" height="240" rx="8" fill="#f1f5f9" stroke="#e2e8f0"/>
<circle cx="110" cy="52" r="36" fill="${a}" opacity=".4"/>
${textBar(40, 100, 140, 12)}
${textBar(40, 122, 100, 10)}
${textBar(40, 148, 180, 10)}
<rect x="240" y="0" width="424" height="240" rx="8" fill="#fff" stroke="#e2e8f0"/>
${textBar(260, 16, 120, 12, '#64748b')}
${textBar(260, 40, 380, 10)}
${textBar(260, 62, 300, 10)}
${textBar(260, 100, 160, 36, a)}
<text x="280" y="124" fill="#fff" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Request leave</text>
${textBar(260, 150, 380, 8)}
${textBar(260, 168, 380, 8)}
${textBar(260, 186, 200, 8)}
`),
    ],
    attendance: () => [
      mockScreen('Attendance — Week view', a, `
${textBar(0, 0, 140, 11, '#64748b')}
${textBar(520, 0, 120, 36, a)}
<text x="548" y="24" fill="#fff" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Clock in</text>
${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  .map(
    (d, i) => `
<text x="${12 + i * 92}" y="58" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">${d}</text>
${[0, 1, 2, 3]
  .map(
    (r) => `
<rect x="${8 + i * 92}" y="${68 + r * 44}" width="84" height="38" rx="6" fill="${i < 5 && r < 3 ? '#dcfce7' : '#f1f5f9'}" stroke="#e2e8f0"/>`
  )
  .join('')}`
  )
  .join('')}
`),
      mockScreen('Attendance — Day timeline', a, `
${textBar(0, 0, 200, 11)}
<rect x="0" y="28" width="664" height="8" rx="4" fill="#e2e8f0"/>
${[8, 9, 10, 11, 12, 13, 14, 15]
  .map(
    (h) => `
<text x="0" y="${48 + (h - 8) * 52}" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">${h}:00</text>
<line x1="48" y1="${44 + (h - 8) * 52}" x2="664" y2="${44 + (h - 8) * 52}" stroke="#f1f5f9" stroke-width="1"/>`
  )
  .join('')}
<rect x="48" y="96" width="6" height="72" rx="3" fill="${a}"/>
<rect x="62" y="108" width="200" height="14" rx="4" fill="#bbf7d0" stroke="${a}"/>
<text x="70" y="119" fill="#065f46" font-family="Segoe UI,sans-serif" font-size="11">Check-in 08:12</text>
<rect x="48" y="200" width="6" height="52" rx="3" fill="#94a3b8"/>
${textBar(62, 212, 160, 12)}
`),
    ],
    financial: () => [
      mockScreen('Finance — Dashboard', a, `
${textBar(0, 0, 160, 10, '#64748b')}
<rect x="0" y="24" width="200" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="12" y="48" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">Revenue YTD</text>
<text x="12" y="78" fill="#0f172a" font-family="Segoe UI,sans-serif" font-size="20" font-weight="700">2.4M</text>
<rect x="216" y="24" width="200" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="228" y="48" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">Outstanding AP</text>
<text x="228" y="78" fill="#b45309" font-family="Segoe UI,sans-serif" font-size="18" font-weight="700">184K</text>
<rect x="432" y="24" width="232" height="72" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="444" y="48" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">Cash position</text>
<text x="444" y="78" fill="${a}" font-family="Segoe UI,sans-serif" font-size="18" font-weight="700">+12%</text>
<rect x="0" y="108" width="664" height="160" rx="8" fill="#fff" stroke="#e2e8f0"/>
<polyline fill="none" stroke="${a}" stroke-width="3" points="20,220 80,200 140,210 200,175 260,185 320,160 380,170 440,140 500,150 560,130 620,145"/>
<circle cx="320" cy="160" r="5" fill="${a}"/>
${textBar(0, 278, 200, 9)}
`),
      mockScreen('Finance — Ledger', a, `
${textBar(0, 0, 100, 10)}
<rect x="0" y="22" width="664" height="28" rx="4" fill="#0f172a"/>
<text x="12" y="41" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Account</text>
<text x="220" y="41" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Debit</text>
<text x="360" y="41" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Credit</text>
<text x="500" y="41" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Balance</text>
${[0, 1, 2, 3, 4, 5]
  .map(
    (i) => `
<rect x="0" y="${54 + i * 34}" width="664" height="32" fill="${i % 2 ? '#f8fafc' : '#fff'}"/>
${textBar(12, 64 + i * 34, 160, 10)}
${textBar(220, 64 + i * 34, 70, 10, '#fecaca')}
${textBar(360, 64 + i * 34, 70, 10, '#bbf7d0')}
${textBar(500, 64 + i * 34, 90, 10)}`
  )
  .join('')}
`),
    ],
    archiving: () => [
      mockScreen('Archive — Search', a, `
<rect x="0" y="0" width="664" height="44" rx="8" fill="#f1f5f9" stroke="#e2e8f0"/>
<rect x="12" y="10" width="520" height="24" rx="6" fill="#fff" stroke="#cbd5e1"/>
<text x="24" y="26" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="12">Search documents…</text>
<rect x="548" y="10" width="100" height="24" rx="6" fill="${a}"/>
<text x="572" y="26" fill="#fff" font-family="Segoe UI,sans-serif" font-size="11" font-weight="600">Search</text>
${[0, 1, 2, 3, 4, 5]
  .map(
    (i) => `
<rect x="0" y="${56 + i * 40}" width="664" height="36" rx="6" fill="#fff" stroke="#e2e8f0"/>
<rect x="12" y="${66 + i * 40}" width="28" height="16" rx="3" fill="#fed7aa"/>
${textBar(52, 66 + i * 40, 220, 10)}
${textBar(400, 66 + i * 40, 80, 10, '#e2e8f0')}
${textBar(520, 68 + i * 40, 56, 10, '#dcfce7')}`
  )
  .join('')}
`),
      mockScreen('Archive — Viewer', a, `
<rect x="0" y="0" width="200" height="260" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
${[0, 1, 2, 3, 4, 5].map((i) => `${textBar(12, 12 + i * 38, 160, 10)}`).join('')}
<rect x="216" y="0" width="448" height="260" rx="8" fill="#fff" stroke="#e2e8f0"/>
<rect x="232" y="16" width="400" height="200" rx="4" fill="#f1f5f9"/>
${textBar(248, 32, 360, 10)}
${textBar(248, 52, 300, 10)}
${textBar(248, 72, 360, 8)}
${textBar(248, 88, 360, 8)}
${textBar(248, 104, 280, 8)}
<rect x="232" y="224" width="120" height="28" rx="6" fill="${a}"/>
<text x="252" y="243" fill="#fff" font-family="Segoe UI,sans-serif" font-size="11" font-weight="600">Download</text>
`),
    ],
    procurement: () => [
      mockScreen('Procurement — Requests', a, `
${textBar(0, 0, 200, 11)}
${[0, 1, 2, 3, 4]
  .map(
    (i) => `
<rect x="0" y="${20 + i * 48}" width="664" height="44" rx="8" fill="#fff" stroke="#e2e8f0"/>
${textBar(16, 32 + i * 48, 180, 10)}
<rect x="520" y="${30 + i * 48}" width="120" height="24" rx="12" fill="${i === 0 ? '#fef3c7' : i === 1 ? '#dcfce7' : '#e2e8f0'}"/>
<text x="548" y="${46 + i * 48}" fill="#0f172a" font-family="Segoe UI,sans-serif" font-size="10" font-weight="600">${i === 0 ? 'Pending' : i === 1 ? 'Approved' : 'Draft'}</text>`
  )
  .join('')}
`),
      mockScreen('Procurement — Contract', a, `
<rect x="0" y="0" width="664" height="36" rx="6" fill="#f1f5f9"/>
${textBar(12, 10, 200, 12)}
<rect x="520" y="8" width="120" height="22" rx="6" fill="${a}"/>
<text x="538" y="23" fill="#fff" font-family="Segoe UI,sans-serif" font-size="10" font-weight="600">Sign</text>
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `${textBar(0, 48 + i * 26, 664, 8)}`).join('')}
<rect x="0" y="240" width="320" height="36" rx="6" fill="#fff" stroke="#e2e8f0"/>
${textBar(12, 252, 120, 10)}
<rect x="360" y="240" width="304" height="36" rx="6" fill="#fff" stroke="#e2e8f0"/>
${textBar(372, 252, 140, 10)}
`),
    ],
    communications: () => [
      mockScreen('Correspondence — Inbox', a, `
${textBar(0, 0, 80, 10)}
${[0, 1, 2, 3, 4, 5].map(
  (i) => `
<rect x="0" y="${18 + i * 42}" width="664" height="38" rx="6" fill="${i === 0 ? '#eff6ff' : '#fff'}" stroke="#e2e8f0"/>
<rect x="12" y="${30 + i * 42}" width="36" height="14" rx="7" fill="${a}" opacity="${i < 2 ? 0.9 : 0.2}"/>
<text x="24" y="${40 + i * 42}" fill="#fff" font-family="Segoe UI,sans-serif" font-size="10" font-weight="700">${i < 2 ? '!' : ''}</text>
${textBar(58, 26 + i * 42, 280, 10)}
${textBar(58, 40 + i * 42, 200, 8, '#cbd5e1')}
${textBar(580, 30 + i * 42, 70, 10, '#e2e8f0')}`
).join('')}
`),
      mockScreen('Correspondence — Thread', a, `
${textBar(0, 0, 320, 11)}
<rect x="0" y="28" width="480" height="72" rx="10" fill="#f1f5f9" stroke="#e2e8f0"/>
${textBar(16, 44, 360, 10)}
${textBar(16, 62, 280, 8)}
<rect x="500" y="28" width="164" height="72" rx="10" fill="${a}" opacity=".15" stroke="${a}"/>
${textBar(512, 48, 130, 10, '#0f172a')}
<rect x="0" y="116" width="664" height="72" rx="10" fill="#fff" stroke="#e2e8f0"/>
${textBar(16, 132, 400, 10)}
${textBar(16, 154, 320, 8)}
<rect x="0" y="200" width="664" height="56" rx="10" fill="#fff" stroke="#e2e8f0"/>
<rect x="12" y="212" width="640" height="32" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
<text x="24" y="232" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Reply…</text>
`),
    ],
    warehouse: () => [
      mockScreen('Warehouse — Stock', a, `
<rect x="0" y="0" width="664" height="32" rx="6" fill="#fef9c3" stroke="#fde047"/>
<text x="12" y="21" fill="#854d0e" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Low stock: 3 SKUs below minimum</text>
<rect x="0" y="40" width="664" height="28" rx="4" fill="#0f172a"/>
<text x="10" y="58" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">SKU</text>
<text x="180" y="58" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Location</text>
<text x="360" y="58" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Qty</text>
<text x="480" y="58" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Status</text>
${[0, 1, 2, 3, 4, 5]
  .map(
    (i) => `
<rect x="0" y="${74 + i * 34}" width="664" height="32" fill="${i === 2 ? '#fef2f2' : i % 2 ? '#f8fafc' : '#fff'}"/>
${textBar(10, 84 + i * 34, 140, 10)}
${textBar(180, 84 + i * 34, 140, 10)}
${textBar(360, 84 + i * 34, 50, 10)}
${textBar(480, 84 + i * 34, 70, 10, i === 2 ? '#fecaca' : '#dcfce7')}`
  )
  .join('')}
`),
      mockScreen('Warehouse — GRN', a, `
${textBar(0, 0, 240, 11)}
<rect x="0" y="28" width="320" height="220" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
<text x="12" y="52" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">Receive lines</text>
${[0, 1, 2, 3, 4].map((i) => `${textBar(12, 62 + i * 36, 280, 10)}`).join('')}
<rect x="340" y="28" width="324" height="220" rx="8" fill="#fff" stroke="#e2e8f0"/>
<rect x="360" y="48" width="200" height="120" rx="4" fill="#f1f5f9"/>
<text x="372" y="100" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Scan barcode</text>
<line x1="380" y1="130" x2="520" y2="130" stroke="#0f172a" stroke-width="2"/>
<rect x="360" y="180" width="140" height="36" rx="8" fill="${a}"/>
<text x="395" y="203" fill="#fff" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Confirm</text>
`),
    ],
    'self-service': () => [
      mockScreen('Self-service — Portal', a, `
<text x="0" y="14" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="12">Quick actions</text>
<rect x="0" y="28" width="210" height="100" rx="10" fill="#fff" stroke="#e2e8f0"/>
<rect x="16" y="44" width="40" height="40" rx="8" fill="${a}" opacity=".3"/>
${textBar(68, 50, 120, 10)}
${textBar(68, 68, 90, 8)}
<rect x="226" y="28" width="210" height="100" rx="10" fill="#fff" stroke="#e2e8f0"/>
<rect x="242" y="44" width="40" height="40" rx="8" fill="${a}" opacity=".3"/>
${textBar(294, 50, 120, 10)}
${textBar(294, 68, 100, 8)}
<rect x="452" y="28" width="212" height="100" rx="10" fill="#fff" stroke="#e2e8f0"/>
<rect x="468" y="44" width="40" height="40" rx="8" fill="${a}" opacity=".3"/>
${textBar(520, 50, 120, 10)}
${textBar(520, 68, 80, 8)}
<rect x="0" y="144" width="664" height="120" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
${textBar(16, 160, 200, 11)}
${textBar(16, 186, 620, 10)}
${textBar(16, 206, 500, 8)}
${textBar(16, 224, 560, 8)}
`),
      mockScreen('Self-service — Form', a, `
${textBar(0, 0, 180, 11)}
${['Employee ID', 'Start date', 'End date', 'Reason']
  .map(
    (label, i) => `
<text x="0" y="${32 + i * 56}" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">${label}</text>
<rect x="0" y="${38 + i * 56}" width="400" height="36" rx="6" fill="#fff" stroke="#cbd5e1"/>`
  )
  .join('')}
<rect x="0" y="260" width="160" height="40" rx="8" fill="${a}"/>
<text x="48" y="285" fill="#fff" font-family="Segoe UI,sans-serif" font-size="13" font-weight="600">Submit</text>
`),
    ],
    biometric: () => [
      mockScreen('Biometric — Enrollment', a, `
<rect x="180" y="10" width="300" height="280" rx="16" fill="#f8fafc" stroke="#e2e8f0"/>
<circle cx="330" cy="120" r="56" fill="none" stroke="${a}" stroke-width="3" opacity=".5"/>
<circle cx="330" cy="120" r="42" fill="none" stroke="${a}" stroke-width="2" opacity=".7"/>
<circle cx="330" cy="120" r="28" fill="${a}" opacity=".25"/>
<path d="M300 150 Q330 175 360 150" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
<text x="250" y="220" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="12">Place finger on sensor</text>
<rect x="260" y="240" width="140" height="36" rx="8" fill="${a}"/>
<text x="285" y="263" fill="#fff" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Capture</text>
`),
      mockScreen('Biometric — Verify', a, `
<rect x="0" y="0" width="400" height="280" rx="10" fill="#0f172a"/>
<ellipse cx="200" cy="130" rx="120" ry="100" fill="none" stroke="#475569" stroke-width="2"/>
<rect x="120" y="90" width="160" height="120" rx="8" fill="#1e293b" stroke="${a}" stroke-width="2"/>
<text x="150" y="155" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Face preview</text>
<rect x="420" y="0" width="244" height="280" rx="10" fill="#fff" stroke="#e2e8f0"/>
<text x="432" y="28" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="12">Match score</text>
<text x="432" y="64" fill="${a}" font-family="Segoe UI,sans-serif" font-size="28" font-weight="800">99.2%</text>
${textBar(432, 90, 200, 10)}
${textBar(432, 110, 160, 8)}
<rect x="432" y="200" width="200" height="44" rx="8" fill="#22c55e"/>
<text x="480" y="228" fill="#fff" font-family="Segoe UI,sans-serif" font-size="13" font-weight="600">Access granted</text>
`),
    ],
    access: () => [
      mockScreen('Access — Zones', a, `
<rect x="0" y="0" width="664" height="200" rx="8" fill="#e2e8f0"/>
<rect x="40" y="40" width="200" height="120" rx="6" fill="#bbf7d0" stroke="#22c55e" stroke-width="2"/>
<text x="100" y="108" fill="#166534" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Lobby</text>
<rect x="260" y="40" width="200" height="120" rx="6" fill="#fecaca" stroke="#ef4444" stroke-width="2"/>
<text x="310" y="108" fill="#991b1b" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Server room</text>
<rect x="480" y="40" width="160" height="120" rx="6" fill="#fef9c3" stroke="#eab308"/>
<text x="520" y="108" fill="#854d0e" font-family="Segoe UI,sans-serif" font-size="11">Warehouse</text>
${textBar(0, 216, 664, 10)}
<rect x="0" y="240" width="664" height="36" rx="6" fill="#0f172a"/>
<text x="12" y="262" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Last sync: 12:04 — Controller online</text>
`),
      mockScreen('Access — Event log', a, `
${textBar(0, 0, 120, 11)}
${[0, 1, 2, 3, 4, 5, 6]
  .map(
    (i) => `
<rect x="0" y="${20 + i * 36}" width="664" height="32" rx="6" fill="${i % 2 ? '#f8fafc' : '#fff'}" stroke="#e2e8f0"/>
<text x="12" y="${40 + i * 36}" fill="#64748b" font-family="monospace" font-size="11">14:${10 + i}02</text>
${textBar(120, 30 + i * 36, 200, 10)}
<rect x="560" y="${28 + i * 36}" width="92" height="18" rx="9" fill="${i % 3 === 0 ? '#dcfce7' : '#fee2e2'}"/>
<text x="582" y="${41 + i * 36}" fill="#0f172a" font-family="Segoe UI,sans-serif" font-size="9" font-weight="600">${i % 3 === 0 ? 'Granted' : 'Denied'}</text>`
  )
  .join('')}
`),
    ],
    mobile: () => [
      mockScreen('Mobile — App shell', a, `
<rect x="200" y="8" width="280" height="300" rx="28" fill="#0f172a"/>
<rect x="212" y="24" width="256" height="268" rx="18" fill="#f8fafc"/>
<rect x="228" y="36" width="224" height="36" rx="8" fill="#fff" stroke="#e2e8f0"/>
<text x="240" y="58" fill="#0f172a" font-family="Segoe UI,sans-serif" font-size="13" font-weight="700">Dashboard</text>
${[0, 1, 2, 3].map((i) => `${textBar(228, 84 + i * 52, 224, 44, '#fff')}`).join('')}
<rect x="268" y="310" width="144" height="5" rx="3" fill="#475569"/>
`),
      mockScreen('Mobile — Notifications', a, `
<rect x="200" y="8" width="280" height="300" rx="28" fill="#0f172a"/>
<rect x="212" y="24" width="256" height="268" rx="18" fill="#f8fafc"/>
${[0, 1, 2, 3]
  .map(
    (i) => `
<rect x="220" y="${36 + i * 64}" width="240" height="56" rx="10" fill="#fff" stroke="#e2e8f0"/>
<rect x="232" y="${48 + i * 64}" width="36" height="36" rx="8" fill="${a}" opacity=".35"/>
${textBar(278, 46 + i * 64, 160, 10)}
${textBar(278, 62 + i * 64, 120, 8, '#cbd5e1')}`
  )
  .join('')}
`),
    ],
    integration: () => [
      mockScreen('Integration — Map', a, `
<defs>
  <marker id="int-arr-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="${a}"/></marker>
  <marker id="int-arr-b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="${a}"/></marker>
</defs>
<rect x="40" y="60" width="160" height="100" rx="10" fill="#f1f5f9" stroke="#94a3b8"/>
<text x="70" y="95" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">ERP</text>
<text x="70" y="112" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="10">SAP / Oracle</text>
<path d="M210 110 L280 110" stroke="${a}" stroke-width="4" marker-end="url(#int-arr-a)"/>
<rect x="290" y="50" width="180" height="120" rx="10" fill="#fff" stroke="${a}" stroke-width="2"/>
<text x="320" y="100" fill="#0f172a" font-family="Segoe UI,sans-serif" font-size="12" font-weight="700">Integration Hub</text>
<text x="320" y="120" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="10">Transform &amp; route</text>
<path d="M480 110 L550 110" stroke="${a}" stroke-width="4" marker-end="url(#int-arr-b)"/>
<rect x="560" y="60" width="140" height="100" rx="10" fill="#f1f5f9" stroke="#94a3b8"/>
<text x="590" y="100" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">HR / Payroll</text>
<rect x="40" y="200" width="664" height="60" rx="8" fill="#0f172a"/>
<text x="56" y="236" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11">Last job: Employee sync — OK (1.2k rows)</text>
`),
      mockScreen('Integration — Payload', a, `
${textBar(0, 0, 200, 11)}
<rect x="0" y="28" width="664" height="200" rx="8" fill="#0f172a"/>
<text x="16" y="52" fill="#86efac" font-family="monospace" font-size="11">{</text>
<text x="24" y="72" fill="#a5b4fc" font-family="monospace" font-size="11">  "employeeId": "AZ-20481",</text>
<text x="24" y="92" fill="#a5b4fc" font-family="monospace" font-size="11">  "status": "ACTIVE",</text>
<text x="24" y="112" fill="#a5b4fc" font-family="monospace" font-size="11">  "updatedAt": "2026-04-18T08:00:00Z"</text>
<text x="16" y="132" fill="#86efac" font-family="monospace" font-size="11">}</text>
<rect x="0" y="244" width="664" height="48" rx="8" fill="#ecfdf5" stroke="#86efac"/>
<text x="16" y="272" fill="#166534" font-family="Segoe UI,sans-serif" font-size="12" font-weight="600">Schema validation passed — webhook delivered</text>
`),
    ],
  };

  const fn = builders[slug];
  if (!fn) throw new Error(`No builder for ${slug}`);
  return fn();
}

fs.mkdirSync(outDir, { recursive: true });
for (const slug of Object.keys(accent)) {
  const [svg1, svg2] = screens(slug, accent[slug]);
  fs.writeFileSync(path.join(outDir, `${slug}-1.svg`), svg1);
  fs.writeFileSync(path.join(outDir, `${slug}-2.svg`), svg2);
}
console.log('Wrote', Object.keys(accent).length * 2, 'UI mock SVGs to', path.relative(root, outDir));
