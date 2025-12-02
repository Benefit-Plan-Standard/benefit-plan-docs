---
id: compliance-overview
title: Compliance Overview
sidebar_label: Overview
---

# Compliance Overview

The Benefit Plan Standard provides a unified schema for representing health benefit plan data.  
Compliance ensures that all implementers—carriers, brokers, TPAs, and developers—adhere to the same structure, vocabulary, and behavior.

## Why Compliance Matters

- Ensures consistency across carriers
- Enables automated ingestion pipelines
- Prevents ambiguous or conflicting data
- Improves downstream analytics and plan comparison
- Supports interoperability between vendors and systems

## What “Compliance” Means

To be considered compliant with the Benefit Plan Standard, an implementation must:

1. Produce a **valid JSON** matching the official schema.
2. Use approved field definitions and vocabulary.
3. Follow crosswalk mapping rules.
4. Respect module requirements (e.g., Medical Core module is mandatory).
5. Include required metadata fields.
6. Pass the validation suite.

## Compliance Levels

### **Level 1 — Structural Compliance**
Your JSON passes schema validation with no errors.

### **Level 2 — Semantic Compliance**
Values are correctly interpreted using the schema vocabulary and crosswalk rules.

### **Level 3 — Full Carrier Compliance**
Your entire plan portfolio is normalized, validated, and consistent.

## How to Become Compliant

1. Read the core specification  
2. Use the example JSON plans  
3. Normalize plan data using the crosswalk  
4. Run the validation suite  
5. Submit for certification (optional)  
