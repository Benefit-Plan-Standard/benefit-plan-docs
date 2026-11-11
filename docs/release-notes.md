---
id: release-notes
title: Release Notes
sidebar_position: 6
---

# Release Notes

This page provides high-level summaries for each published version of the Benefit Plan Standard.  
For a detailed, chronological record of all technical changes, see the **Changelog**.

---

# v1.2.0: CARIN Alignment, Medicare Advantage and Medicare Part D

**Release Date:** November 13, 2026  
**Status:** Stable (backward-compatible with v1.1.0 and v1.0.0)

v1.2.0 is final after 9 published drafts, tagged `v1.2.0-draft.1` through `v1.2.0-draft.9`; the release is tagged `v1.2.0`, and its schema is draft 9's with a root description that no longer says DRAFT. Under the release rule of the [governance policy](/docs/governance/versioning-release-policy), a draft becomes final after 2 independent adopters implement and validate it; the 2 on record are in [the adopters file](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md) of the schema repository. The draft-by-draft record is in the [changelog](/docs/changelog).

## 📐 What v1.2.0 Adds to v1.1.0

Every addition is optional. Compared with v1.1.0, no property is removed, none becomes required and no type is narrowed, and the 7 examples that validate against v1.1.0 validate against v1.2.0 unchanged.

- **Network tiers and limits**, from the reconciliation with the CARIN Digital Insurance Card changes of June 2026: `network_tiers[].tier_class`, `parent_tier_id` and `provider_set`, and `limits[].raw_text`.
- **Medicare Advantage fields**: `plan_identifiers`, `service_area`, `premium`, `part_b_premium_reduction`, the `pharmacy` accumulators, cost-share unit ranges, caps and ranges, `deductible_ref`, `coverage_basis`, `alternative_group`, limit `scope`, `shared_limit_id` and `carryover`, and per-benefit `source_references`.
- **For the medical MVP** of the CMS Health Tech Ecosystem Real-Time Benefits workgroup: `contacts` and `network_tiers[].provider_directory_url`.
- **The pharmacy module in core** (draft 6, copying the module v0.2.1, then v0.2.2 at draft 7 and v0.2.3 at draft 9): the rest of the `pharmacy` object and the benefit extension fields, and `cost_shares[].moop_ref`.
- **Draft 7**: `pharmacy.deductible.family_amount`, `cost_shares[].min_amount` and `min_basis`, `network_cost_shares[].covered_under` and `not_covered_reason`, and `source_references[].document`.
- **Draft 8**: `limits[].unlimited`, with `limits[].value` null on such an entry and only there.
- **Draft 9**: `pharmacy.formulary_reference.formulary_version` and `formulary_items_url`, `formulary_items[].coverage_basis`, `negotiation_selected_drug`, `capped_benefit` and `source_references`, `premium.drug_amount`, `formulary_items[].drug_name` and `quantity_limit_detail.units` optional, and [`/schema/v1.2.0/formulary.schema.json`](https://benefitplanstandard.org/schema/v1.2.0/formulary.schema.json), a drug list written once for the plans that share it.

## 🗂 Recommended Vocabularies

| Vocabulary | Version | Entries |
|------------|---------|---------|
| Canonical benefits | 1.4.0 | 124 across 13 categories |
| Categories | 1.2.0 | 38 codes, with `REDUCTIONS_IN_COST_SHARING` |
| Markets | 1.2.0 | 13 codes, with `medicare_part_d` |
| Plan types | 1.1.0 | 13 codes |
| Benefit types | 1.1.0 | 9 codes |

## 🛠 Tools in the Schema Repository

The Marketplace, Medicare Advantage and Part D formulary importers, the converter to the CARIN SBC `InsurancePlan` profile, and `scripts/validate.js`, which now validates against v1.2.0 when no `--schema` is given (it was v1.1.0).

## 🔁 Migration from v1.1.0

- A v1.1.0 document needs no change. To say it is a v1.2.0 document, set `schema_version` to "1.2.0".
- `node scripts/validate.js plan.json` validates against v1.2.0; `--schema schema/v1.1.0/benefit-plan.schema.json` keeps the v1.1.0 check.
- A document written against a v1.2.0 draft validates against v1.2.0 as it is: the release schema is draft 9's.
- What a reader written for v1.1.0 can misread in a v1.2.0 document:
  - `limits[].value` is null when `unlimited` is true: the source states no limit of that type.
  - `premium.amount` is not the whole premium when `premium.drug_amount` is present: the monthly premium is their sum (a Medicare Advantage plan with drug coverage).
  - `pharmacy.formulary_items[].drug_name` and `quantity_limit_detail.units` can be absent.
  - An accumulator's `network_tier` is the `tier_id` of a tier in `network_tiers`, such as `IN`, `OUT` or `POS`; the importers write tier ids.
  - A benefit can have no `canonical_key` and no `network_cost_shares` rows, such as a Medicare Advantage Reductions in Cost Sharing entry (`category` `REDUCTIONS_IN_COST_SHARING`), whose amount is a `dollars` limit.

## 🧭 Not in This Release

- The validator does not flag a plan-identity value that has no source reference.
- The rule that `market` comes from a dataset with provenance is not written into a tool.

## 📝 Known Gaps in This Documentation

Three pages of this site are not yet brought to v1.2.0. They follow the release:

- [Medical MVP](/docs/specification/medical-mvp) still says the importers write the Benefit Plan Standard schema 1.2.0 as "a draft that becomes final after 2 independent adopters implement and validate it". The page follows the medical MVP technical specification, which does not change with this release.
- [Field Definitions](/docs/specification/field-definitions) lists the v1.1.0 fields only. The v1.2.0 additions are listed above, in the schema and in the [changelog](/docs/changelog).
- [Crosswalk](/docs/specification/crosswalk): the generated medical crosswalk table still says "tier_class drafted for v1.2". It changes when the crosswalk data is generated again.

---

# v1.1.0: Production-Driven Refinement

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
- `market` (string), now formally in the schema, not just the docs

### Accumulators
- 4 new out-of-network slots: `oon_individual_deductible`, `oon_family_deductible`, `oon_individual_oop_max`, `oon_family_oop_max`
- New per-slot fields: `period`, `network_tier`, `embedded`, `applies_to` (now on OOP max too)

### Benefits
- `benefit_type` discriminator (default `medical`): enables future modules without restructuring
- `canonical_key`: machine-readable canonical identifier
- `raw_label`: verbatim source-document label for traceability

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

The schema repo holds ten example plans in [`examples/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples), each paired with the published document it comes from. Eight are SBC examples, taken from a Summary of Benefits and Coverage. Two are Summary of Benefits examples.

| Example file | Carrier | Market | Plan type | Plan year | Schema | Source document | Benefits | Plan-level source references | Benefits with their own source references |
|---|---|---|---|---|---|---|---|---|---|
| `aetna_example.json` | Aetna | `large_group` | PPO | 2026 | 1.1.0 | SBC | 27 | 19 | 0 |
| `aetna_ppo5000_example.json` | Aetna | `large_group` | PPO | 2026 | 1.1.0 | SBC | 27 | 18 | 0 |
| `ambetter_example.json` | Ambetter | `individual` | HMO | 2026 | 1.1.0 | SBC | 30 | 23 | 0 |
| `bluecross_example.json` | FloridaBlue | `individual` | PPO | 2023 | 1.1.0 | SBC | 31 | 26 | 0 |
| `cigna_example.json` | Cigna | `large_group` | OAP | 2026 | 1.1.0 | SBC | 30 | 24 | 0 |
| `gatorcare_example.json` | GatorCare | not stated | EPO | 2026 | 1.2.0 | SBC, and the pharmacy SBC | 47 | 33 | 15 |
| `kaiser_example.json` | Kaiser | `individual` | HMO | 2026 | 1.1.0 | SBC | 31 | 23 | 0 |
| `united_example.json` | UnitedHealthcare | `small_group` | POS | 2026 | 1.1.0 | SBC | 29 | 22 | 0 |
| `humana_example.json` | Humana | `medicare_advantage` | HMO | 2026 | 1.2.0 | Summary of Benefits | 72 | 19 | 72 |
| `scan_example.json` | SCAN Health Plan | `medicare_advantage` | HMO | 2026 | 1.2.0 | Summary of Benefits | 71 | 14 | 71 |

The 7 SBC examples that declare 1.1.0 validate against v1.1.0 and, unchanged, against v1.2.0. `gatorcare_example.json` and the two Summary of Benefits examples use fields added in v1.2.0, so they validate against v1.2.0 and not v1.1.0.

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

# v1.0.0: Foundational Release (Draft)

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

