---
id: installation
title: Installation & Usage
sidebar_position: 1
---

# Installation & Usage

This section explains how to obtain the Benefit Plan Standard schema and start using it in your own projects.  There are two primary use cases:

1. **Consuming normalized plan data**
2. **Ingesting carrier documents and producing normalized JSON**

## Installing the Schema

The canonical JSON schema is available in the `benefit-plan-schema` repository under `schema/v1.0.0/benefit-plan.schema.json`.  You can download this file directly or install it via npm.

### Via npm

If you manage dependencies with npm or yarn, you can install the schema package (planned for future publication) like so:

```bash
npm install @benefitplanstandard/schema
# or
yarn add @benefitplanstandard/schema
```

The package exports the JSON schema and TypeScript typings.

### Manual Download

You can download the schema file directly from GitHub:

```bash
curl -O https://raw.githubusercontent.com/Benefit-Plan-Standard/benefit-plan-schema/main/schema/v1.0.0/benefit-plan.schema.json
```

Store it in your project and use your preferred JSON Schema validator (AJV, JSON Schema Core, etc.) to validate normalized plans.

## Using the Schema

Once you have the schema file, you can validate JSON data like this (using AJV in Node.js):

```js
const Ajv = require('ajv');
const schema = require('./benefit-plan.schema.json');

const ajv = new Ajv();
const validate = ajv.compile(schema);

const data = require('./example-plan.json');
const valid = validate(data);

if (!valid) {
  console.error(validate.errors);
} else {
  console.log('Plan is valid!');
}
```

For a complete example, see the `examples/` directory in the schema repository.

## Building Your Own Ingestion Pipeline

If you want to create normalized JSON from carrier SBCs or EOCs, follow these high‑level steps:

1. **Parse the document** — Use an OCR/Text extraction tool to convert PDFs or DOCX files into structured text.
2. **Identify sections** — Locate the benefit schedule, deductible table, OOP table, and any ancillary sections (pharmacy, dental, vision).
3. **Extract data** — Using the field definition matrix and crosswalk, extract values from the document and map them to normalized fields.
4. **Validate and clean** — Convert strings to numbers, normalize units, and validate your JSON against the schema.
5. **Augment with source_refs** — Store references back to the original document for traceability.

We plan to provide open source ingestion scripts in a future repository.  For now, see the [Carrier Crosswalk](/docs/specification/crosswalk) for mapping guidance.
