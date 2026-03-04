/**
 * Sitemap generator — reads blog/case-study slugs from data files
 * and writes public/sitemap.xml.
 *
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = 'https://services.shubhztechwork.com';
const today = new Date().toISOString().split('T')[0];

// Extract slugs via regex from TypeScript data files
function extractSlugs(filePath) {
  const content = readFileSync(resolve(ROOT, filePath), 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

const blogSlugs = extractSlugs('src/data/blogs.ts');
const caseSlugs = extractSlugs('src/data/case-studies.ts');

const entries = [
  // Static pages
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/technologies', changefreq: 'monthly', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blogs', changefreq: 'weekly', priority: '0.8' },
  { loc: '/case-studies', changefreq: 'monthly', priority: '0.8' },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
  // Blog posts
  ...blogSlugs.map((s) => ({ loc: `/blogs/${s}`, changefreq: 'monthly', priority: '0.7' })),
  // Case studies
  ...caseSlugs.map((s) => ({ loc: `/case-studies/${s}`, changefreq: 'monthly', priority: '0.7' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${SITE}${e.loc}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('\n')}
</urlset>
`;

const outPath = resolve(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`Sitemap generated: ${entries.length} URLs → ${outPath}`);
