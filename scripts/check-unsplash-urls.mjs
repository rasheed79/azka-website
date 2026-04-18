/** Verify systemSpecImages URLs: node scripts/check-unsplash-urls.mjs */
const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

const pairs = [
  ['hr', 'photo-1522071820081-009f0129c71c', 'photo-1551434678-e076c223a692'],
  ['attendance', 'photo-1486312338219-ce68d2c6f44d', 'photo-1521737604893-d14cc237f11d'],
  ['financial', 'photo-1551288049-bebda4e38f71', 'photo-1554224154-22dec7ec8818'],
  ['archiving', 'photo-1450101499163-c8848c66ca85', 'photo-1454165804606-c3d57bc86b40'],
  ['procurement', 'photo-1556742049-0cfed4f6a45d', 'photo-1556761175-4b46a572b786'],
  ['communications', 'photo-1563986768609-322da13575f3', 'photo-1531482615713-2afd69097998'],
  ['warehouse', 'photo-1581092160562-40aa08e78837', 'photo-1553413077-190dd305871c'],
  ['self-service', 'photo-1517694712202-14dd9538aa97', 'photo-1523240795612-9a054b0db644'],
  ['biometric', 'photo-1555949963-aa79dcee981c', 'photo-1581091226825-a6a2a5aee158'],
  ['access', 'photo-1506126613408-eca07ce68773', 'photo-1486406146926-c627a92ad1ab'],
  ['mobile', 'photo-1512941937669-90a1b58e7e9c', 'photo-1553877522-43269d4ea984'],
  ['integration', 'photo-1460925895917-afdab827c52f', 'photo-1544197150-b99a580bb7a8'],
];

let bad = 0;
for (const [slug, a, b] of pairs) {
  for (const [idx, id] of [
    [1, a],
    [2, b],
  ]) {
    const url = u(id);
    const r = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    const ok = r.status === 200;
    if (!ok) bad++;
    console.log(`${slug} ${idx}\t${r.status}\t${ok ? 'OK' : 'FAIL'}\t${id}`);
  }
}
process.exit(bad ? 1 : 0);
