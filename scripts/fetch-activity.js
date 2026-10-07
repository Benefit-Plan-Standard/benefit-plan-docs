#!/usr/bin/env node
/**
 * fetch-activity.js: pre-build commit activity snapshot
 *
 * Counts commits per UTC day over the last 12 months across every public
 * repository in the Benefit-Plan-Standard GitHub organization and writes
 * static/data/activity.json. The home page ActivityGraph component imports
 * that file at build time.
 *
 * Only dates and counts are stored. No author names, emails or avatars.
 *
 * Uses GITHUB_TOKEN from the environment when present (5000 requests/hour),
 * otherwise calls the API unauthenticated (60 requests/hour per IP).
 *
 * This script never fails the build. On any API error it keeps the existing
 * activity.json (or writes an empty one if none exists) and prints a warning.
 *
 * Runs automatically as part of `npm run build`.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ORG = 'Benefit-Plan-Standard';
const API = 'https://api.github.com';
const OUT = path.join(__dirname, '..', 'static', 'data', 'activity.json');
const TIMEOUT_MS = 15000;

function log(msg) {
  console.log(`[fetch-activity] ${msg}`);
}

function warn(msg) {
  console.warn(`[fetch-activity] WARNING: ${msg}`);
}

function headers() {
  const h = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'benefit-plan-docs-activity',
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

// Follows the Link: rel="next" header until there are no more pages.
// `allowEmpty` treats 409 (empty repository) as zero results.
async function getAllPages(url, { allowEmpty = false } = {}) {
  const items = [];
  let next = url;
  while (next) {
    const res = await fetch(next, {
      headers: headers(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (allowEmpty && res.status === 409) return items;
    if (!res.ok) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      const body = (await res.text()).slice(0, 200);
      throw new Error(
        `${res.status} ${res.statusText} for ${next}` +
          (remaining === '0' ? ' (rate limit exhausted)' : '') +
          (body ? `: ${body}` : '')
      );
    }
    const page = await res.json();
    if (!Array.isArray(page)) throw new Error(`unexpected response for ${next}`);
    items.push(...page);
    const link = res.headers.get('link') || '';
    const m = link.match(/<([^>]+)>;\s*rel="next"/);
    next = m ? m[1] : null;
  }
  return items;
}

async function build() {
  const since = new Date();
  since.setUTCFullYear(since.getUTCFullYear() - 1);
  const sinceIso = since.toISOString();

  const repos = (
    await getAllPages(`${API}/orgs/${ORG}/repos?type=public&per_page=100`)
  )
    .filter((r) => !r.private)
    .map((r) => r.name)
    .sort((a, b) => a.localeCompare(b));

  const days = {};
  let totalCommits = 0;
  let lastCommit = null;

  for (const repo of repos) {
    const commits = await getAllPages(
      `${API}/repos/${ORG}/${repo}/commits?since=${encodeURIComponent(sinceIso)}&per_page=100`,
      { allowEmpty: true }
    );
    for (const c of commits) {
      // Committer date, the same date the `since` filter applies to.
      const when = c.commit && c.commit.committer && c.commit.committer.date;
      if (!when) continue;
      const day = when.slice(0, 10); // ISO 8601 UTC, YYYY-MM-DD
      days[day] = (days[day] || 0) + 1;
      totalCommits += 1;
      if (!lastCommit || when > lastCommit) lastCommit = when;
    }
    log(`${repo}: ${commits.length} commits`);
  }

  const sortedDays = {};
  for (const d of Object.keys(days).sort()) sortedDays[d] = days[d];

  return {
    generatedAt: new Date().toISOString(),
    days: sortedDays,
    totalCommits,
    lastCommitDate: lastCommit ? lastCommit.slice(0, 10) : null,
    repos,
  };
}

function writeJson(data) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const tmp = `${OUT}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, OUT);
}

async function main() {
  log(
    `fetching public repos for ${ORG} ` +
      (process.env.GITHUB_TOKEN ? '(authenticated)' : '(unauthenticated)')
  );
  try {
    const data = await build();
    writeJson(data);
    log(
      `${data.totalCommits} commits on ${Object.keys(data.days).length} days ` +
        `across ${data.repos.length} repos, last ${data.lastCommitDate}`
    );
  } catch (err) {
    if (fs.existsSync(OUT)) {
      warn(`${err.message}. Keeping the existing ${path.relative(process.cwd(), OUT)}.`);
    } else {
      warn(`${err.message}. No existing activity.json, writing an empty one.`);
      writeJson({
        generatedAt: new Date().toISOString(),
        days: {},
        totalCommits: 0,
        lastCommitDate: null,
        repos: [],
      });
    }
  }
}

main().catch((err) => {
  // Last resort: never fail the build over activity data.
  warn(`unexpected error: ${err && err.message}`);
});
