const fs = require('fs');
const path = require('path');
const { parseCSV, generateHTMLTable, replaceInFile } = require('./utils');

// CONFIGURATION
const SHEET_ID = "2PACX-1vTgekv3wditmUSRm_CJv7O1PsC6KJHUDBNba7V8nYg2_kGiVj5dD8ho8WaUamf8czqvAnh-Xg9neT58";

const TABS = [
  { name: "Plan Metadata", gid: "1330740892" },
  { name: "Network Tiers", gid: "770854045" },
  { name: "Accumulators", gid: "6477239" },
  { name: "Benefits", gid: "1949697548" },
  { name: "Limits", gid: "1700182924" },
  { name: "Conditions", gid: "1702172376" },
  { name: "Source Reference", gid: "1846651702" },
  { name: "Field Definitions", gid: "1583805432" },
  { name: "Carrier Vocabulary", gid: "1583805432" }
];

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

for (const tab of TABS) {
      const csvData = await fetchSheetCSV(SHEET_ID, tab.gid, tab.name);
      const parsedData = parseCSV(csvData);

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
