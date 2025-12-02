---
id: compliance-validation
title: Validation Guidelines
sidebar_label: Validation
---

# Validation Guidelines

This page explains how to validate a JSON benefit plan against the official schema.

## Step 1 — Use the JSON Schema

The official schema is available in the repository:

```
/benefit-plan-schema/schema.json
```

You may validate a file using any JSON Schema validator (AJV, Python, Java, etc.).

### Example using Node + AJV

```bash
npm install ajv
```

```js
import Ajv from "ajv";
import schema from "./schema.json" assert { type: "json" };
import plan from "./my-plan.json" assert { type: "json" };

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

if (!validate(plan)) {
  console.error(validate.errors);
} else {
  console.log("Plan is valid!");
}
```

## Step 2 — Semantic Validation

After structural checks, the following must be validated:

- Network tier names map to schema terms  
- Deductible and copay structures follow correct formats  
- Limit and accumulator structures match definitions  
- Carrier metadata is standardized  

## Step 3 — Module Validation

Modules define which fields must appear:

- **Medical Core** — always required  
- **Pharmacy** — required only if plan includes Rx coverage  
- **Dental** — optional  
- **Vision** — optional  

## Step 4 — Use the Validation Suite

We will provide an official automated validation suite in the upcoming release that includes:

- Schema validator  
- Semantic validator  
- Vocabulary checker  
- Crosswalk consistency checker  
