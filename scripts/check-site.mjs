#!/usr/bin/env node
// Comprueba la web generada antes de publicarla.
// Uso: node scripts/check-site.mjs [directorio]   (por defecto, dist)
// Falla si hay CSS en línea (el CSP lo bloquearía), faltan etiquetas de SEO,
// hay más o menos de un <h1> o hay enlaces internos rotos.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? 'dist';
const errors = [];

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const resolves = (href) => {
  const path = decodeURIComponent(href.split(/[?#]/)[0]);
  const target = join(root, path);
  if (path.endsWith('/')) return existsSync(join(target, 'index.html'));
  return existsSync(target);
};

for (const file of walk(root).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const name = '/' + relative(root, file);
  const fail = (msg) => errors.push(`${name}: ${msg}`);
  const is404 = name === '/404.html';

  if (/\sstyle\s*=/i.test(html)) fail('atributo style= (bloqueado por el CSP)');
  if (/<style[\s>]/i.test(html)) fail('<style> en línea (bloqueado por el CSP)');
  if (!/<title>[^<]+<\/title>/.test(html)) fail('sin <title>');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (title && title.length > 60) fail(`título de ${title.length} caracteres (máximo 60)`);
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!desc) fail('sin meta description');
  else if (desc.length > 155) fail(`descripción de ${desc.length} caracteres (máximo 155)`);
  if (!is404) {
    if (!/<link rel="canonical"/.test(html)) fail('sin canonical');
    if (!/hreflang="x-default"/.test(html)) fail('sin hreflang');
  }
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`${h1} <h1> (debe haber exactamente uno)`);

  for (const [, href] of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    if (!resolves(href)) fail(`enlace roto ${href}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n` + [...new Set(errors)].map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ ${root}: sin problemas`);
