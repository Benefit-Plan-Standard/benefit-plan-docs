---
id: compliance-validation
title: Validation Guidelines
sidebar_label: Validation
---

# Validation Guidelines

This page explains how validation works in the Benefit Plan Standard and how to run it. There is no certification body and no approval step: you run a validator, and the file answers for itself.

Validation has **two layers**, and they check different things.

| Layer | What it checks | Enforced by | Result |
|---|---|---|---|
| **1. Schema validation** (normative) | Structure, required fields, types, nesting | Any JSON Schema Draft 2020-12 validator | Pass / fail |
| **2. Vocabulary conformance** (advisory) | Values of `category`, `canonical_key`, `market`, `plan_type` against the published vocabularies | The included script, or your own lookup | Warnings |

A useful way to hold the distinction: **the schema is the grammar, the vocabularies are the dictionary.** A file can be grammatically perfect while using a term the dictionary does not know. Layer 1 fails hard on broken grammar; layer 2 warns about unknown words, because the vocabularies are non-normative and adopters may extend them.

## The quickest path: the included script

The schema repository ships a validator that runs both layers in one command:

```bash
git clone https://github.com/Benefit-Plan-Standard/benefit-plan-schema
cd benefit-plan-schema
npm install ajv ajv-formats

node scripts/validate.js examples/aetna_example.json
```

Output for a conforming file:

```
PASS  examples/aetna_example.json — valid against schema/v1.1.0/benefit-plan.schema.json
      vocabulary: all category/canonical_key/market/plan_type values are canonical
```

Output for a file with a missing required field and a non-canonical category:

```
FAIL  examples/broken.json — 1 schema error(s):
      (root)  must have required property 'carrier'
      vocab-warning: benefits[0].category "BANANA_SERVICES" is not in vocabularies/categories.json
```

Useful flags:

```bash
node scripts/validate.js --no-vocab plan.json        # layer 1 only
node scripts/validate.js --strict-vocab plan.json    # vocabulary warnings also fail
node scripts/validate.js --schema schema/v1.2.0/benefit-plan.schema.json plan.json
```

The script source is [`scripts/validate.js`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/scripts/validate.js) — about 150 lines, no framework, readable in one sitting.

## Layer 1 — Schema validation

The official schema is [`schema/v1.1.0/benefit-plan.schema.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/schema/v1.1.0/benefit-plan.schema.json) (JSON Schema Draft 2020-12). Any compliant validator in any language works: AJV for Node, `jsonschema` for Python, `everit` or `networknt` for Java, and so on.

What it enforces:

- **Required fields** — a conforming plan must carry `plan_id`, `plan_name`, `carrier`, `network_tiers`, and `benefits`
- **Types** — a copay `amount` is a number, never the string `"fifty dollars"`
- **Structure** — benefits contain `network_cost_shares[]`, which contain ordered `cost_shares[]`; accumulators declare their own period, tier, and embedded-vs-aggregate behavior
- **Formats** — dates, when `ajv-formats` (or the equivalent) is loaded

Example with plain AJV in Node (the schema is Draft 2020-12, so use the `ajv/dist/2020` build):

```js
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import fs from "fs";

const schema = JSON.parse(fs.readFileSync("schema/v1.1.0/benefit-plan.schema.json"));
const plan = JSON.parse(fs.readFileSync("my-plan.json"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);
if (!validate(plan)) {
  console.error(validate.errors);   // exact path and rule for every violation
} else {
  console.log("Valid against Benefit Plan Standard v1.1.0");
}
```

## Layer 2 — Vocabulary conformance

The schema deliberately does **not** hard-code the controlled vocabularies as enums. The reason is stated in the schema's own field descriptions: *"Not enforced as enum to allow adopter extension."* Welding the lists into the schema would mean every vocabulary addition forces a schema release, and every adopter with an unanticipated benefit type gets a validation failure instead of a conversation.

Instead, the recommended values live as versioned lists in [`/vocabularies`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/vocabularies):

- `canonical-benefits.json` — 100 canonical benefit keys (`primary_care`, `imaging_advanced`, …)
- `categories.json` — 25 benefit categories (`PHYSICIAN_SERVICES`, `EMERGENCY_CARE`, …)
- `markets.json` — market segments
- `plan-types.json` — plan types

Using these values is what makes plans from different carriers *comparable* rather than merely *parseable*. The included script checks them and reports non-canonical values as warnings. If your documents need a term the vocabulary lacks, that is a pull request, not a fork.

## What validation does not check

Validation checks **shape, not truth**. If a carrier's real copay is $50 and your file says $40, the file is valid — wrong, but valid. Accuracy is the responsibility of whatever produced the file, which is why the standard carries `source_references` (plan-level citations back to the source document) and `raw_label` (the carrier's verbatim wording on each benefit, kept alongside the normalized value). Machines verify shape; provenance lets humans verify truth.

## Roadmap

The current script covers the schema validator and the vocabulary checker. Two further checks are planned for the automated suite:

- **Semantic validator** — cross-field rules (e.g., every `tier_id` referenced by a cost share exists in `network_tiers`)
- **Crosswalk consistency checker** — agreement between example files and the carrier crosswalk
