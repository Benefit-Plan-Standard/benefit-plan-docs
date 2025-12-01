---
id: crosswalk
title: Carrier Crosswalk
sidebar_position: 3
---

# Carrier Crosswalk

The Benefit Plan Standard maintains a **carrier crosswalk** that maps each issuer’s vocabulary, structure, and terminology into the normalized schema fields.  
This ensures that different carriers’ representations of benefits—often inconsistent in naming, structure, and granularity—can be interpreted in a unified, machine-readable way.

Because carriers vary widely in how they describe deductibles, copays, limits, and categories, the crosswalk is a foundational component of the standard.

---

## Live Crosswalk (Google Sheet)

A live version of the crosswalk is maintained below.

<!-- Docusaurus SSR-safe iframe wrapper -->
<div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
  <iframe
    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTgekv3wditmUSRm_CJv7O1PsC6KJHUDBNba7V8nYg2_kGiVj5dD8ho8WaUamf8czqvAnh-Xg9neT58/pubhtml"
    width="100%"
    height="800"
    style="border: 1px solid #ccc;"
  ></iframe>
</div>


The sheet is read-only to ensure consistency of the standard.  
Future carriers (e.g., Kaiser, Molina, Oscar, Ambetter) already have placeholder columns for expansion.

---

## Purpose

Carriers do not use consistent terminology.  
For example:

- One carrier may label a row **“Office Visit - Primary Care (PCP)”**,  
  while another writes **“Primary Care Provider: You pay $25”**,  
  and another uses **“PCP Copay per encounter”**.

- Deductible applicability might be written as:
  - “After deductible”
  - “Subject to deductible”
  - “Copay does not apply to deductible”
  - “Ded waived”
  - Combined expressions such as *“$25 copay + 20% coinsurance after deductible”*

Without a standardized crosswalk, ingestion pipelines must be hand-tuned for every carrier.

The crosswalk solves this by documenting, for each normalized field:

- How each carrier expresses the value  
- Semantics that must be preserved  
- Parsing notes and exceptions  
- Mappings into the normalized JSON structure  

---

## Structure of the Crosswalk

The Google Sheet contains multiple tabs, including:

### **Plan Metadata**
Maps identifiers such as:
- plan_id  
- carrier name  
- plan_type  
- market segment  

### **Network Tiers**
Mappings for:
- In-network, out-of-network naming
- Tier structures  
- Carrier-specific vocabulary  

### **Accumulators**
How each carrier expresses:
- individual_deductible  
- family_deductible  
- individual_oop  
- family_oop  

### **Benefits**
Mappings of:
- categories  
- service names  
- copays  
- coinsurance expressions  
- deductible applicability  

### **Limits**
Mappings for:
- visit/day limits  
- period definitions (annual, per stay, lifetime, etc.)  

### **Conditions**
Mappings for:
- prior authorization  
- referral requirements  
- contextual notes  

### **Source Reference**
Extracts and page references used for ingestion traceability.

---

## Using the Crosswalk

When integrating a new carrier:

### **1. Identify each benefit entry**  
Locate the carrier’s terms in the crosswalk (or add them when necessary).

### **2. Map each value to the normalized field**  
Examples:

- **Copay differences**  
  - Blue Cross: “$25 per visit”  
  - SCAN: “$0 copay, coinsurance does not apply”  
  These map to the same `benefits[].cost_shares.copay` field.

- **Deductible expressions**  
  - GatorCare lists medical and pharmacy separately  
  - Aetna merges them  
  The crosswalk clarifies how to populate `individual_deductible` and related fields.

### **3. Capture exceptions and conditions**  
Ambiguous phrasing such as:
- “after facility fee”
- “per admission deductible”
- “ded waived for virtual visits”
is documented in the crosswalk’s notes column.

### **4. Extend when necessary**  
If a carrier introduces:
- new cost-share terminology  
- split benefit categories  
- multi-tier networks  
add a row or column in the Google Sheet and update the ingestion rules.

---

## Updating the Crosswalk

The Google Sheet is the **canonical source of truth** for carrier mappings.  
Updates follow these principles:

- **Accuracy first**: No changes without verification against the carrier’s SBC/EOC.  
- **Non-breaking additions**: New carriers and new vocabulary do not break prior mappings.  
- **Schema-aligned**: Crosswalk rows always correspond to normalized fields.  

For contributors participating in ingestion logic or carrier analysis, request edit access through the governance process.

---

## Summary

The Carrier Crosswalk is essential for:

- Translating carrier-specific formats into a unified schema  
- Ensuring ingestion is deterministic  
- Maintaining consistency across carriers  
- Supporting future expansion  

The live version ensures that the standard remains current, accurate, and interoperable as additional carriers and plan formats are introduced.

