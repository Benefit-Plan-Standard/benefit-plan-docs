---
id: changelog
title: Changelog
sidebar_position: 5
---

# Changelog

This changelog lists all notable changes to the Benefit Plan Standard.  For a high‑level overview of changes in each release, see the [release notes](/docs/release-notes).  The format is based on [Keep a Changelog](https://keepachangelog.com/) and adheres to Semantic Versioning.

## [Unreleased]: v1.2.0 draft

**Status:** draft, tagged [`v1.2.0-draft.1`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/releases/tag/v1.2.0-draft.1) on 2026-09-20. Not a release. Every v1.0.0 and v1.1.0 document validates against it unchanged; every addition is optional. A final v1.2.0 release needs validation by two independent adopters, per the [governance policy](/docs/governance/versioning-release-policy). Full field-by-field detail with page evidence: [docs/changelog.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md) in the schema repository.

The draft carries two additive blocks.

### Added, 2026-07-02: alignment with the HL7 CARIN Digital Insurance Card IG
Reconciles the three `InsurancePlan` changes merged into the CARIN IG on June 25, 2026 (FHIR-57525 multi-tier cost sharing, FHIR-57526 deductible applicability, FHIR-57527 structured benefit limitation).
- `tier_class`, `parent_tier_id` and `provider_set` on `network_tiers[]`, so a cost designation within one network (a carrier's "Value Choice" rate) or a delivery channel (virtual care) is distinguishable from an actual provider network.
- `raw_text` on `benefits[].limits[]`, the verbatim limitation text; `limits[].period` now recommends `per_plan_year`, `per_calendar_year`, `per_benefit_period`, `per_lifetime`.
- Mapping notes: per-cost-share deductible applicability and typed limits were already expressed since v1.0.0. See [docs/carin-dic-reconciliation.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/carin-dic-reconciliation.md).

### Added, 2026-09-20: Medicare Advantage
What a CMS Summary of Benefits for a Medicare Advantage plan carries and an ACA Summary of Benefits and Coverage does not. Origin: two 2026 documents read end to end and mapped construct by construct, the SCAN Classic (HMO) Summary of Benefits for Los Angeles County and the Humana Gold Plus H1036-025 (HMO) Summary of Benefits. Fourteen constructs had no home in the standard; twelve are added, two are deferred.
- **Plan identity:** `plan_identifiers[]` (CMS contract, plan and segment, HIOS), `service_area` (state and counties), `premium` and `part_b_premium_reduction`.
- **Pharmacy accumulators:** an optional core `pharmacy` object (Part D deductible scoped to tiers, out-of-pocket threshold, coverage stages), a strict subset of the pharmacy module shape, plus `cost_shares[].deductible_ref` to say which deductible a step refers to.
- **Cost shares:** `unit_range` for day-range copays (days 1 to 6 at one price, 7 to 90 at another); `max_amount` and `max_basis` for caps; `amount_min`, `amount_max`, `rate_min`, `rate_max` for ranges.
- **Benefits:** `coverage_basis` (`medicare_covered`, `supplemental_mandatory`, `supplemental_optional`); `alternative_group` for either/or benefits; benefit-level `source_references[]`; an explicit null `moop_applicability` now means "not stated."
- **Limits:** `carryover` (`none`, `next_period`, `within_year`) for allowances; `scope` and `shared_limit_id` for per-ear limits and one count spread across several benefits; `per_12_months` as a rolling period.
- **Vocabulary (non-normative):** twelve category codes for areas the Summary of Benefits prices and the SBC does not (`HEARING`, `DENTAL`, `VISION`, `PART_B_DRUGS`, `PODIATRY`, `TRANSPORTATION`, `OVER_THE_COUNTER`, `MEALS`, `IN_HOME_SUPPORT`, `FITNESS`, `PERSONAL_EMERGENCY_RESPONSE`, `MEMBER_SUPPORT`), and a new `benefit-types.json`.
- **Examples:** `scan_example.json` and `humana_example.json`, keyed by hand from their Summary of Benefits, verified value by value against the cited pages, with both source PDFs alongside. They validate against the v1.2.0 draft only. Analysis and verification record: [docs/medicare-advantage-notes.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/medicare-advantage-notes.md).

### Deferred from this draft
- Optional supplemental packages (riders): a name, a premium, and the benefits that apply only when a member buys the package.
- Population-specific cost sharing, such as Extra Help replacing the Part D amounts for members who qualify.

### Not changed
- `schema/v1.0.0` and `schema/v1.1.0` are frozen. The eight SBC examples are not edited and validate against v1.1.0 and the draft with the same result.

## [1.1.0] — 2026‑05‑21

Backward-compatible minor release. v1.0.0 documents validate against v1.1.0 unchanged.

### Added
- **Plan identity**: `plan_year` (integer), `coverage_period` (`start_date` + `end_date`), and `market` at the top level.
- **Out-of-network accumulators**: four new slots — `oon_individual_deductible`, `oon_family_deductible`, `oon_individual_oop_max`, `oon_family_oop_max`. Closes the v1.0.0 gap where PPO plans with separate in/out-of-network accumulators could not be fully represented.
- **Richer accumulator metadata**: `period`, `network_tier`, and `embedded` fields on every accumulator slot. `applies_to` is now also available on OOP-max slots (parity with deductibles).
- **Benefit discriminator**: `benefit_type` field on `benefits[]` items — enables future modules (`pharmacy`, `dental`, `vision`, `behavioral_health`) without restructuring.
- **Benefit identity**: `canonical_key` (machine-readable canonical identifier) and `raw_label` (verbatim source-document label) on `benefits[]` items.
- **Cost-share notes**: optional `notes` field on `cost_shares[]` items.
- **Recommended vocabularies**: 100 canonical benefit identifiers, 25 categories, 12 markets, 12 plan types. See the [vocabularies directory](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/vocabularies).
- **FHIR alignment guide**: field-by-field BPS ↔ FHIR R4 `InsurancePlan` mapping with worked example, lossy-mapping table, and round-tripping guidance. See [docs/fhir-alignment.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/fhir-alignment.md).
- **Expanded examples**: all 7 carrier example plans now cover 25–30 benefits each (198 total), spanning the full SBC service inventory.
- **Repository hygiene**: `LICENSE` (MIT) and `.gitattributes` added to the schema repo.

### Fixed
- Documentation: `product_type` → `plan_type`, `individual_oop` / `family_oop` → `individual_oop_max` / `family_oop_max`, `source_refs` → `source_references`. The published schema was already correct; only the docs were out of sync.
- `examples/scan_example.json`: removed `notes` from inside `cost_shares[]` items (would have failed `additionalProperties: false`). The same `notes` field is now formally defined on `cost_shares[]` in v1.1.0.

### Backward compatibility
- All v1.0.0 required fields remain required.
- All v1.0.0 optional fields remain present with the same types.
- All additions are optional; `additionalProperties: false` boundaries are respected.
- A document declaring `"schema_version": "1.0.0"` validates against the v1.1.0 schema without changes.

## [1.0.0] — 2025‑11‑30

### Added
- **Initial schema** covering plan metadata, network tiers, accumulators, benefits, limits, conditions, and source references.
- **Carrier crosswalk** with mappings for Blue Cross, GatorCare, SCAN, Aetna, UnitedHealthcare, Cigna, and Humana; plus blank columns for future carriers.
- **Field definitions** describing the purpose, type, and usage of each normalized field.
- **Modules** page summarizing core modules and how to extend the schema.
- **Specification overview** explaining design principles, normative vocabulary, and interoperability goals.
- **Documentation site** built with Docusaurus and published at `benefitplanstandard.org`.

### Changed
- None (initial release).

### Removed
- None (initial release).

---
