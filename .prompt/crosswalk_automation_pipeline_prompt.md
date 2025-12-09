I need you to build a complete automated pipeline for generating the Carrier Crosswalk documentation page from a Google Sheet. This pipeline must be fully functional, reliably maintainable, and integrated with GitHub Actions. Follow all instructions meticulously, continue fixing errors until everything works, and explain each change you make.

## GOAL

Convert a Google Sheet containing multiple tabs (Plan Metadata, Network Tiers, Accumulators, Benefits, Limits, Conditions, Source Reference) into clean, professional HTML tables embedded in `/docs/specification/crosswalk.md`.

This pipeline must automatically regenerate the crosswalk page whenever the Google Sheet is updated or when the GitHub Action is manually triggered.

## REQUIREMENTS

### 1. \*\*Create \*\*``

This script must:

- Fetch a PUBLIC Google Sheet via CSV export for each worksheet tab.
- Parse each CSV into JSON arrays.
- Convert each array into a clean HTML table with headers.
- Wrap each table in a collapsible Docusaurus “details” block:

```
:::details Plan Metadata
<table></table>
:::
```

- Replace the placeholder section inside `/docs/specification/crosswalk.md` between markers:

```
<!-- AUTO-GENERATED-CROSSWALK:START -->
... replace this ...
<!-- AUTO-GENERATED-CROSSWALK:END -->
```

- Write the updated Markdown file to disk.
- Produce console logs.
- Fail with clear errors if anything breaks.

Use Node.js (ES modules allowed).

### 2. \*\*Modify \*\*``

Add this placeholder where the auto-generated tables should be inserted:

```
<!-- AUTO-GENERATED-CROSSWALK:START -->
This content will be replaced automatically.
<!-- AUTO-GENERATED-CROSSWALK:END -->
```

### 3. **Add Google Sheet URL**

At the top of `generateCrosswalk.js`, define:

```js
const SHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID";
const TABS = [
  "Plan Metadata",
  "Network Tiers",
  "Accumulators",
  "Benefits",
  "Limits",
  "Conditions",
  "Source Reference"
];
```

Copilot should request the Sheet ID if missing.

### 4. **Add Helper Utils**

Create `scripts/utils.js` with:

- CSV → JSON parser
- JSON → HTML table generator
- Markdown section replacement helper

### 5. \*\*Create GitHub Action \*\*``

The workflow must:

- Trigger on push to `main`.
- Trigger on pull requests touching `docs/**` or `scripts/**`.
- Trigger manually via `workflow_dispatch`.
- Use Node 22.
- Run `node scripts/generateCrosswalk.js`.
- Commit changes **only if output changed**.

Include safe commit logic:

```
if [[ -n "$(git status --porcelain)" ]]; then
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add .
    git commit -m "Automated crosswalk update"
    git push
fi
```

### 6. **Place script in npm lifecycle**

Add to `package.json`:

```json
"scripts": {
  "generate:crosswalk": "node scripts/generateCrosswalk.js"
}
```

### 7. **Validation**

Before marking complete, Copilot must:

- Run the script locally (simulate environment).
- Check for syntax errors.
- Ensure folder structure exists.
- Verify Markdown injection works.
- Ensure tables render properly in Docusaurus.
- Ensure GitHub Action YAML is valid.
- Validate CSV parser handles quotes, commas, blank lines.
- Confirm that missing tabs throw helpful errors.
- Test Markdown replace-in-file logic.
- Prevent infinite commit loops.

### 8. **Iterate Until Working**

Copilot must continue:

- Fixing errors.
- Improving the pipeline.
- Refactoring where needed.
- Ensuring the final system is production-ready.

## OUTPUT

Once complete, Copilot should produce a fully functional system where:

- The Google Sheet is the source of truth.
- The Markdown crosswalk page is always fresh.
- Tables look clean and professional.
- No Google iframe/embed is needed.
- Documentation stays in sync automatically.

**COPILOT PROMPT END**

---

# 📘 HOW TO RUN THE PIPELINE IN THE FUTURE

Once Copilot completes the full pipeline, here are your simple usage instructions:

##
