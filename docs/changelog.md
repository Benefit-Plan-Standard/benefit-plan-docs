---
id: changelog
title: Changelog
sidebar_position: 5
---

# Changelog

This changelog lists all notable changes to the Benefit Plan Standard.  For a high‑level overview of changes in each release, see the [release notes](/docs/release-notes).  The format is based on [Keep a Changelog](https://keepachangelog.com/) and adheres to Semantic Versioning.

## [Unreleased]

### Added
- Placeholder for future changes since the last release.  Once changes are merged into `main` or `next`, they will be listed here until a new version is tagged.

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
