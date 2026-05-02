#!/usr/bin/env node
/**
 * Sets GISCUS_CATEGORY_ID in giscus.ts (used by CI and locally).
 * Usage: node scripts/patch-giscus-category.mjs DIC_kwD...
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '../src/app/components/giscus/giscus.ts');
const id = process.argv[2]?.trim();
if (!id || !/^DIC_[A-Za-z0-9]+$/.test(id)) {
  console.error('Usage: node scripts/patch-giscus-category.mjs <data-category-id>');
  console.error('Example id format: DIC_kwDOSSS4pA0CQ');
  process.exit(1);
}

let s = fs.readFileSync(file, 'utf8');
const re = /const GISCUS_CATEGORY_ID = '[^']*';/;
if (!re.test(s)) {
  console.error('Could not find GISCUS_CATEGORY_ID in giscus.ts');
  process.exit(1);
}
s = s.replace(re, `const GISCUS_CATEGORY_ID = '${id}';`);
fs.writeFileSync(file, s);
console.log('Updated GISCUS_CATEGORY_ID in', file);
