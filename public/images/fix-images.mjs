import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const TARGETS = ['mahak-hero', 'mahak-about'];

for (const name of TARGETS) {
  const src = path.join('public', 'images', `${name}.png`);
  const dst = path.join('public', 'images', `${name}.webp`);
  try {
    await sharp(src).webp({ quality: 90 }).toFile(dst);
    const [b, a] = await Promise.all([fs.stat(src), fs.stat(dst)]);
    console.log(`DONE: ${name}.png (${(b.size/1048576).toFixed(2)} MB) -> ${name}.webp (${(a.size/1024).toFixed(0)} KB)`);
  } catch {
    console.log(`SKIP: ${src} nahi mila`);
  }
}

const filesToScan = ['index.html'];
async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else if (/\.(jsx|js|css|html)$/.test(e.name)) filesToScan.push(full);
  }
}
try { await walk('src'); } catch {}

let total = 0;
for (const f of filesToScan) {
  let code = await fs.readFile(f, 'utf8');
  let n = 0;
  for (const name of TARGETS) {
    const parts = code.split(`${name}.png`);
    n += parts.length - 1;
    code = parts.join(`${name}.webp`);
  }
  if (n) {
    await fs.writeFile(f, code);
    console.log(`CODE FIXED: ${f} me ${n} jagah`);
    total += n;
  }
}
