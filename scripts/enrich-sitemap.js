#!/usr/bin/env node
/**
 * enrich-sitemap.js — post-build sitemap enrichment
 *
 * WHY THIS EXISTS
 * ---------------
 * Docusaurus's sitemap plugin only knows about pages IT routes (docs/*, src/pages/*).
 * Anything dropped into static/ — for example the hand-built /why interactive explainer —
 * is served fine but is INVISIBLE to the generated sitemap, so Google never learns it exists.
 *
 * RULE FOR FUTURE CHANGES: every publicly reachable page must appear in the sitemap.
 * If you add a standalone HTML page under static/, add its path to EXTRA_PAGES below.
 * If you add a normal docs page, Docusaurus handles it and you do nothing.
 *
 * This script also stamps <lastmod> on every entry (Google uses it to prioritise
 * recrawling) and raises <priority> on the pages that matter most. <lastmod> is the
 * date of the last commit that touched the page's source, read from git, so a page
 * that did not change keeps its old date across rebuilds; a page whose source cannot
 * be found (or a shallow checkout with no history) falls back to the build date.
 * The deploy workflow checks out with fetch-depth 0 for this reason.
 *
 * Runs automatically as part of `npm run build`.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SITE_URL = 'https://benefitplanstandard.org';
const SITEMAP = path.join(__dirname, '..', 'build', 'sitemap.xml');

// Pages served from static/ that Docusaurus does not route.
// Add a line here whenever a new standalone page ships.
const EXTRA_PAGES = [
  { path: '/why', changefreq: 'monthly', priority: '0.9' },
];

// Pages that deserve a higher priority than the 0.5 default.
const PRIORITY_OVERRIDES = {
  '/': '1.0',
  '/docs': '0.9',
  '/docs/specification/overview': '0.8',
  '/docs/specification/field-definitions': '0.8',
  '/docs/specification/crosswalk': '0.8',
  '/docs/getting-started/installation': '0.8',
  '/docs/getting-started/examples': '0.8',
  '/docs/compliance/compliance-validation': '0.8',
};

function fail(msg) {
  console.error(`[enrich-sitemap] ERROR: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(SITEMAP)) {
  fail(`no sitemap at ${SITEMAP} — did the Docusaurus build run?`);
}

const raw = fs.readFileSync(SITEMAP, 'utf8');
const buildDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const ROOT = path.join(__dirname, '..');

// Source files behind each URL path. Docs pages come from the metadata Docusaurus
// writes during the build (.docusaurus/.../site-docs-*.json: permalink -> source),
// so a page whose frontmatter sets an id or slug still maps to its file.
// The home page and the static pages are listed by hand.
const SOURCES_BY_PATH = {
  '/': ['src/pages/index.js', 'src/pages/index.module.css', 'src/components'],
  '/why': ['static/why.html', 'static/why'],
};
const DOCS_META_DIR = path.join(ROOT, '.docusaurus', 'docusaurus-plugin-content-docs', 'default');
if (fs.existsSync(DOCS_META_DIR)) {
  for (const name of fs.readdirSync(DOCS_META_DIR)) {
    if (!name.startsWith('site-docs-') || !name.endsWith('.json')) continue;
    try {
      const meta = JSON.parse(fs.readFileSync(path.join(DOCS_META_DIR, name), 'utf8'));
      if (meta.permalink && typeof meta.source === 'string') {
        SOURCES_BY_PATH[meta.permalink.replace(/\/$/, '') || '/'] = [meta.source.replace(/^@site\//, '')];
      }
    } catch (_) { /* a file that is not page metadata */ }
  }
}

// Last commit date (YYYY-MM-DD) across the given paths, or null when git has none.
function gitLastDate(paths) {
  const existing = paths.filter((p) => fs.existsSync(path.join(ROOT, p)));
  if (existing.length === 0) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...existing], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch (_) {
    return null;
  }
}

const lastmodCache = new Map();
function lastmodFor(pathname) {
  if (lastmodCache.has(pathname)) return lastmodCache.get(pathname);
  const sources = SOURCES_BY_PATH[pathname];
  const date = (sources && gitLastDate(sources)) || buildDate;
  lastmodCache.set(pathname, date);
  return date;
}

// Pull every existing <url>…</url> block out of the generated sitemap.
const blocks = raw.match(/<url>[\s\S]*?<\/url>/g) || [];
if (blocks.length === 0) fail('generated sitemap contained no <url> entries');

const entries = blocks.map((block) => {
  const loc = (block.match(/<loc>([^<]*)<\/loc>/) || [])[1];
  if (!loc) return null;
  const changefreq = (block.match(/<changefreq>([^<]*)<\/changefreq>/) || [])[1] || 'weekly';
  const pathname = loc.replace(SITE_URL, '') || '/';
  const priority =
    PRIORITY_OVERRIDES[pathname] ||
    (block.match(/<priority>([^<]*)<\/priority>/) || [])[1] ||
    '0.5';
  return { loc, changefreq, priority, lastmod: lastmodFor(pathname) };
}).filter(Boolean);

const known = new Set(entries.map((e) => e.loc));

// Append the static pages Docusaurus cannot see.
let added = 0;
for (const extra of EXTRA_PAGES) {
  const loc = `${SITE_URL}${extra.path}`;
  if (known.has(loc)) continue;
  entries.push({ loc, changefreq: extra.changefreq, priority: extra.priority, lastmod: lastmodFor(extra.path) });
  known.add(loc);
  added += 1;
}

// Homepage first, then alphabetical — purely cosmetic, but makes diffs readable.
entries.sort((a, b) => {
  if (a.loc === `${SITE_URL}/`) return -1;
  if (b.loc === `${SITE_URL}/`) return 1;
  return a.loc.localeCompare(b.loc);
});

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries
    .map(
      (e) =>
        '  <url>\n' +
        `    <loc>${e.loc}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        '  </url>'
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(SITEMAP, xml, 'utf8');

console.log(
  `[enrich-sitemap] ${entries.length} URLs written ` +
    `(${added} static page${added === 1 ? '' : 's'} added; lastmod from git, ` +
    `${entries.filter((e) => e.lastmod !== buildDate).length} dated before today)`
);
