---
id: release-notes
title: Release Notes
sidebar_position: 6
---

# Release Notes

This page provides high-level summaries for each published version of the Benefit Plan Standard.  
For a detailed, chronological record of all technical changes, see the **Changelog**.

---

# v1.1.0 — Production-Driven Refinement

**Release Date:** May 21, 2026  
**Status:** Stable (backward-compatible with v1.0.0)

v1.1.0 is the first minor release after six months of production extraction experience across real carrier SBCs and EOCs. Every v1.0.0 document continues to validate against v1.1.0 unchanged.

## 🎯 What v1.1.0 Solves

Three concrete gaps surfaced in production:

1. **PPO accumulators needed separate in- and out-of-network slots.** v1.0.0 had only four accumulator slots (implicitly in-network). Real PPO plans publish distinct out-of-network deductibles and OOP maxes.
2. **Plan identity needed structure across years.** Effective dates are routinely missing or ambiguous; a `plan_year` field and explicit `coverage_period` make plan-family grouping possible.
3. **Future modules needed a discriminator hook.** Pharmacy, dental, vision, and behavioral health benefits should share the same schema as medical, but only if there is a `benefit_type` field that downstream consumers can branch on.

## 📐 Schema Additions

### Plan identity
- `plan_year` (integer)
- `coverage_period` (`start_date`, `end_date`)
- `market` (string) — now formally in the schema, not just the docs

### Accumulators
- 4 new out-of-network slots: `oon_individual_deductible`, `oon_family_deductible`, `oon_individual_oop_max`, `oon_family_oop_max`
- New per-slot fields: `period`, `network_tier`, `embedded`, `applies_to` (now on OOP max too)

### Benefits
- `benefit_type` discriminator (default `medical`) — enables future modules without restructuring
- `canonical_key` — machine-readable canonical identifier
- `raw_label` — verbatim source-document label for traceability

### Cost shares
- `notes` field added to `cost_shares[]` items

## 🗂 Recommended Vocabularies

New `vocabularies/` directory in the schema repo:

| Vocabulary | Purpose | Entries |
|------------|---------|---------|
| Canonical benefits | Recommended values for `canonical_key` | 100 across 13 categories |
| Categories | Recommended values for `category` | 25 codes |
| Markets | Recommended values for `market` | 12 codes |
| Plan types | Recommended values for `plan_type` | 12 codes |

These are **non-normative**: the schema treats the corresponding fields as free-form strings. Adopters who want strict enums can layer them locally.

## 📦 Expanded Examples

All 7 carrier example plans now cover 25–30 benefits each (198 total):

| Carrier | Plan type | Benefits |
|---------|-----------|----------|
| Aetna | PPO | 30 |
| Blue Cross | PPO | 30 |
| Cigna | PPO (OAP) | 30 |
| GatorCare | PPO | 30 |
| Humana | MA-PD HMO | 28 |
| SCAN | MA-PD HMO | 25 |
| UnitedHealthcare | MA-PD HMO | 25 |

Generation is deterministic — see `scripts/build_examples.py` in the schema repo.

## 🩹 FHIR Alignment

New guide: [`docs/fhir-alignment.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/fhir-alignment.md). Field-by-field BPS ↔ FHIR R4 `InsurancePlan` mapping, a worked example, a lossy-mapping table (with extension/qualifier advice), and round-tripping guidance. The HL7 R6 ballot is in flight; the guide will be refreshed once R6 stabilizes.

## 🩹 Documentation Fixes

The docs site was out of sync with the published schema in three places. All three are corrected in v1.1.0:

- `product_type` → `plan_type`
- `individual_oop` / `family_oop` → `individual_oop_max` / `family_oop_max`
- `source_refs` → `source_references` (also clarified: top-level and optional, not per-benefit)

The published schema itself was already correct.

## 🔁 Backward Compatibility

- All v1.0.0 required fields remain required.
- All v1.0.0 optional fields remain present with the same types.
- All additions are optional; `additionalProperties: false` boundaries are respected.
- A document declaring `"schema_version": "1.0.0"` validates against the v1.1.0 schema without changes.

## 🧭 What's Next

- Formal **pharmacy module** schema using `benefit_type: "pharmacy"`.
- **Behavioral health, dental, vision, maternity** modules.
- HealthPlanAPI **reference-implementation alignment** to v1.1.0.
- Refreshed FHIR alignment once **R6** normative behavior stabilizes.

---

# v1.0.0 — Foundational Release (Draft)

**Release Date:** June 2025  
**Status:** Draft (public preview)

The **v1.0.0** release represents the foundational publication of the Benefit Plan Standard, defining the structural, semantic, and operational elements for a unified benefit-plan representation. This release establishes the baseline for interoperability across carriers and for downstream applications that consume normalized health plan data.

---

## 🎯 Goals of v1.0.0

- Establish a **stable, long-term JSON schema** for representing all major components of medical benefit plans.  
- Provide a **repeatable normalization model** capable of absorbing the diversity found in carrier SBCs, EOCs, and benefit booklets.  
- Create a **transparent governance** and versioning framework to support future expansion.  
- Deliver a **developer-friendly documentation site** and onboarding pathway.  
- Ensure this standard is practical and deployable for real ingestion pipelines.

---

## 📐 Schema & Specification

### ✔ Initial Schema Backbone  
A formal schema backbone was created, defining the core structural domains:

- **Plan metadata** (plan identifiers, market, carrier, year, type)  
- **Network tiers** and structurally consistent cost-sharing layers  
- **Accumulator model** (deductibles, out-of-pocket limits)  
- **Benefits model** (services, categories, cost shares)  
- **Limits structure** (quantity limits, time periods)  
- **Conditions model** (prior auth, referral requirements, execution notes)  
- **Source referencing** (page and text excerpt mapping for ingestion traceability)

This structure supports both commercial health plans and Medicare Advantage mappings.

---

## 🧩 Module Definitions

Version 1.0.0 introduces the **modular architecture**, allowing future expansions without breaking earlier versions.  
The initial modules include:

- **Core Plan Metadata Module**  
- **Network Cost-Share Module**  
- **Accumulator Module**  
- **Benefit Definitions Module**  
- **Limits & Conditions Module**  
- **Source Mapping Module**

These modules form the minimum required set for end-to-end plan normalization.

---

## 🗂 Field Definition Matrix

A **comprehensive, machine-aligned definition matrix** was added, listing:

- Every normalized field  
- Field type  
- Required/optional status  
- Semantic meaning  
- Examples  
- Alignment with carrier terminology  
- Future expansion notes  

This matrix strengthens interoperability and ensures consistent ingestion rules across carriers.

---

## 🔄 Carrier Crosswalk Framework

The initial crosswalk framework was introduced, with support for:

- **Blue Cross Blue Shield**  
- **GatorCare**  
- **SCAN**  
- **Aetna**  
- **UnitedHealthcare**  
- **Cigna**  
- **Humana**

The crosswalk provides:

- Vocabulary harmonization  
- Mapping rules  
- Exception handling patterns  
- Notes on ambiguous carrier language  
- Placeholders for additional carriers (Kaiser, Molina, Oscar, Ambetter)

A publicly accessible **live Google Sheet** now serves as the canonical crosswalk reference.

---

## 📚 Documentation Framework

Version 1.0.0 includes a full documentation site built using Docusaurus:

### **Included Sections**
- **Getting Started** (installation, ingestion guidelines, examples)  
- **Specification** (schema overview, modules, crosswalk, field definitions)  
- **Governance** (mission, overview, roadmap, FAQ, contribution process, versioning policy)  
- **Project Index** and **Changelog**  

### **Developer-Friendly Enhancements**
- MDX React components  
- Embedded crosswalk viewer  
- Logical sidebar hierarchy  
- Clear versioning metadata  

---

## 🔧 Tooling & Infrastructure

- Integration of a structured **GitHub repository layout** for schema and documentation  
- Foundation for future:
  - CI validation of schema updates  
  - Automated build & publishing  
  - Example normalization pipelines  

---

## 🧭 What’s Next (v1.1.0 Preview)

Planned enhancements include:

- New carriers in the crosswalk (Kaiser, Molina, Oscar, Ambetter)  
- Pharmacy benefit module (preliminary)  
- Formal plan “Variants” support (SBC variations under one parent ID)  
- Machine-executable ingestion rules (YAML-based rule system)  
- Example benefit-plan JSON library  
- API specification for parsing & normalization services  

---

# Summary

The **v1.0.0 release** establishes the Benefit Plan Standard as a credible, extensible, and production-ready framework for benefit-plan normalization.  
This foundation enables:

- predictable ingestion pipelines  
- unified data structures  
- improved interoperability across carriers  
- future schema and module expansions  

The work delivered here forms the core of all future releases.

