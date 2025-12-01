---
id: ingestion-guidelines
title: Ingestion Guidelines
sidebar_position: 3
---

# Ingestion Guidelines

These guidelines provide best practices for converting carrier‑specific documents (e.g., SBCs, EOCs, certificates) into normalized JSON using the Benefit Plan Standard.

## 1. Source Documents

Carriers publish plan information across multiple document types.  Primary sources include Summary of Benefits and Coverage (SBC), Evidence of Coverage (EOC), and Certificates of Coverage.  Use the most authoritative source available, and prefer machine‑readable formats (e.g., PDF with selectable text) over scanned images.

### Priority Order

1. **Machine‑Readable PDFs:** Extract text directly.  Use OCR only if necessary.  Avoid summarised marketing pages.
2. **HTML or Web Pages:** If official SBC/EOC data is available as HTML, parse the DOM carefully, capturing headings and tables.
3. **Manual Data:** For carriers without published documents, request structured data via partnership or API.

## 2. Normalization Workflow

1. **Parse:** Extract plan metadata, benefit categories, cost shares, limits, and conditions from the source document.  Preserve context such as headings and section breaks.
2. **Map Fields:** Use the [Carrier Crosswalk](/docs/specification/crosswalk) to map carrier terms to normalized fields.  If you encounter new vocabulary, propose additions via the contribution process.
3. **Populate JSON:** Create a JSON file that conforms to the schema.  Ensure all required fields are present.  Use `null` for unknown optional values; do not omit keys.
4. **Validate:** Run the JSON through the schema validation tool (forthcoming).  Fix any errors before submission.
5. **Attach References:** For each normalized item, capture the page number and excerpt from the source document.  Include them in `source_reference` objects for traceability.

## 3. Handling Ambiguities

Carrier documents often contain ambiguous or compound cost share expressions.  Use these principles:

- **Separate Components:** Break compound expressions into individual cost shares.  E.g., “$50 copay + 20% coinsurance after deductible” becomes `copay = 50` and `coinsurance = 0.2` with `deductible = true`.
- **Use Comments:** If a cost share applies only under certain conditions (e.g., telehealth or after first visit), capture this in the `conditions.notes` field.
- **Prior Authorizations & Referrals:** If the document states “prior authorization may be required,” set `prior_authorization = true` and note specifics under `conditions.notes`.
- **Limit Periods:** Convert phrases like “10 visits per calendar year” into `type = visits`, `value = 10`, `period = year`.

## 4. Quality Assurance

- **Peer Review:** Have another contributor review your normalized JSON and crosswalk mapping.  They should verify accuracy and completeness.
- **Testing:** Use sample ingestion scripts or unit tests to load the JSON and ensure it integrates with the parsing pipeline.
- **Feedback Loop:** Capture any issues encountered during ingestion and propose updates to the crosswalk, field definitions, or schema.  Continuous improvement is key to maintaining quality.

## 5. Submission

After your JSON passes validation and peer review, submit it via a pull request to the `examples` or `plans` directory in the repository.  Include the source document (if legally permissible) or a reference link, along with notes about any unique challenges.

---
