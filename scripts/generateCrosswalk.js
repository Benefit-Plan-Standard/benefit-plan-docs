const fs = require('fs');
const path = require('path');
const { parseCSV, generateHTMLTable, replaceInFile } = require('./utils');

// CONFIGURATION
const SHEET_ID = "2PACX-1vTgekv3wditmUSRm_CJv7O1PsC6KJHUDBNba7V8nYg2_kGiVj5dD8ho8WaUamf8czqvAnh-Xg9neT58";

// Phase 1 of the crosswalk pipeline (see Operations crosswalk-pipeline-design.md):
// the draft pharmacy tabs are sourced from a versioned repo file, NOT the Sheet.
const PHARMACY_DATA_FILE = 'docs/specification/pharmacy-crosswalk-data.json';

// Phase 2 of the crosswalk pipeline (2026-08-29): the medical tabs are ALSO
// repo-file-sourced now. The Google Sheet is no longer load-bearing.
const MEDICAL_DATA_FILE = 'docs/specification/medical-crosswalk-data.json';

// The generator is DUAL-SOURCE:
//   - a tab with `gid`  → fetched from the Google Sheet as CSV (none currently).
//   - a tab with `file` → read from a versioned repo JSON file (all tabs since Phase 2).
const TABS = [
  { name: "Plan Metadata", file: MEDICAL_DATA_FILE },
  { name: "Network Tiers", file: MEDICAL_DATA_FILE },
  { name: "Accumulators", file: MEDICAL_DATA_FILE },
  { name: "Benefits", file: MEDICAL_DATA_FILE },
  { name: "Limits", file: MEDICAL_DATA_FILE },
  { name: "Conditions", file: MEDICAL_DATA_FILE },
  { name: "Source Reference", file: MEDICAL_DATA_FILE },
  { name: "Field Definitions", file: MEDICAL_DATA_FILE },
  { name: "Carrier Vocabulary", file: MEDICAL_DATA_FILE },
  // --- Pharmacy module v0.2.0 (DRAFT, non-normative) tabs — repo-file-sourced ---
  { name: "Pharmacy Tiers",      file: PHARMACY_DATA_FILE },
  { name: "Pharmacy Networks",   file: PHARMACY_DATA_FILE },
  { name: "Coverage Stages",     file: PHARMACY_DATA_FILE },
  { name: "Pharmacy Tier Codes", file: PHARMACY_DATA_FILE }
];

// Load file-sourced tab data once. Keyed by tab name → 2D array of rows
// (same shape parseCSV yields for Sheet tabs).
function loadFileTabs() {
  const map = {};
  const seen = new Set();
  for (const tab of TABS) {
    if (!tab.file || seen.has(tab.file)) continue;
    seen.add(tab.file);
    const full = path.join(__dirname, '..', tab.file);
    const doc = JSON.parse(fs.readFileSync(full, 'utf8'));
    Object.assign(map, doc.tabs || {});
  }
  return map;
}

const TARGET_FILE = 'docs/specification/crosswalk.mdx';

const START_MARKER = '<!-- AUTO-GENERATED-CROSSWALK:START -->';
const END_MARKER = '<!-- AUTO-GENERATED-CROSSWALK:END -->';

async function fetchSheetCSV(sheetId, gid, name) {
  const url = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=${gid}&output=csv`;

  console.log(`Fetching tab: ${name} (gid=${gid}) ...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${name}: ${response.statusText}`);
  }

  const text = await response.text();

  if (text.trim().startsWith('<')) {
    throw new Error(
      `Tab "${name}" returned HTML instead of CSV. Check its gid or sheet visibility.`
    );
  }

  return text;
}

async function main() {
  try {
    let generatedContent = ''; // ← FIX: Start with **empty string**, not newline.

    const fileTabs = loadFileTabs();

for (const tab of TABS) {
      let parsedData;

      if (tab.file) {
        // Repo-file-sourced tab (Phase 1: pharmacy). Data is a 2D array of rows.
        parsedData = fileTabs[tab.name];
        if (!parsedData) {
          console.log(`Skipping tab: ${tab.name} (no "${tab.name}" entry in ${tab.file})`);
          continue;
        }
        console.log(`Loading tab: ${tab.name} (from ${tab.file}) ...`);
      } else if (tab.gid === null || tab.gid === undefined) {
        // Declared but not yet sourced (no gid and no file).
        console.log(`Skipping tab: ${tab.name} (no source — gid/file unset)`);
        continue;
      } else {
        // Sheet-sourced tab (medical tabs).
        const csvData = await fetchSheetCSV(SHEET_ID, tab.gid, tab.name);
        parsedData = parseCSV(csvData);
      }

      const htmlTable = generateHTMLTable(parsedData, {
        tableClass: "crosswalk-table"
      });

      // UPDATED: Use standard HTML <details> tags instead of :::
      // We also add the 'crosswalk-details' class to match your intended styling
      generatedContent += 
`<details class="crosswalk-details">
<summary>${tab.name}</summary>

${htmlTable}

</details>

`;
    }

    // FIX: Ensure clean ending
    generatedContent = generatedContent.trim() + '\n';

    console.log(`Updating ${TARGET_FILE}...`);
    replaceInFile(TARGET_FILE, START_MARKER, END_MARKER, generatedContent);
    console.log('Successfully updated crosswalk documentation.');

  } catch (error) {
    console.error('Pipeline failed:', error.message);
    process.exit(1);
  }
}

main();
