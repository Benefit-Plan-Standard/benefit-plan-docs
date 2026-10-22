---
id: changelog
title: Changelog
sidebar_position: 5
---

# Changelog

This changelog lists all notable changes to the Benefit Plan Standard.  For a high‑level overview of changes in each release, see the [release notes](/docs/release-notes).  The format is based on [Keep a Changelog](https://keepachangelog.com/) and adheres to Semantic Versioning.

## v1.2.0 draft, tooling and examples (2026-10-20 and 2026-10-21)

Schema change in the v1.2.0 draft only: 2 optional fields and a new `network_tier` description, listed under [Unreleased]: v1.2.0 draft below. Every v1.0.0 and v1.1.0 document still validates against the draft unchanged. The wording follows [the changelog in the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md), entries of 2026-10-20 and 2026-10-21.

- **Schema (draft).** `schema/v1.2.0/benefit-plan.schema.json`: `contacts` (`member_services_phone`, `website`) and `network_tiers[].provider_directory_url` on 2026-10-20, for the medical MVP technical specification of the CMS Health Tech Ecosystem Real-Time Benefits workgroup; on 2026-10-21 the 2 `network_tier` descriptions, on the deductible and the out-of-pocket maximum accumulators, say the value is the `tier_id` of a tier in `network_tiers` (`IN`, `OUT`, `POS` or another tier id the document defines). The type is unchanged.
- **Vocabulary.** `vocabularies/canonical-benefits.json` version 1.3.0 (was 1.2.0), 118 entries: `physical_and_speech_therapy` (`rehabilitation`), physical therapy and speech-language pathology priced together, as in the Plan Benefit Package category 7i. The `canonical-benefits` CodeSystem is rebuilt (version 1.3.0, 118 concepts) and republished on this site.
- **Medicare Advantage importer.** `scripts/from-pbp.js` and `fhir/pbp-crosswalk.json` (41 rows, 35 with a canonical key; was 40 and 33). 7i is keyed `physical_and_speech_therapy`. 14a is read into a `preventive_care` benefit: a $0 copay in network, not subject to the deductible, on the plan's attestation `pbp_b14a_mc_prevent_attest` (1 on all 6,872 plans), and out of network and at the point of service from the Section C groups that list 14a. `premium` from `pbp_d_mplusc_premium` and `part_b_premium_reduction` from `pbp_d_mco_pay_reduct_yn` and `_amt`, with no period, since no file states one. `contacts.member_services_phone` from `pbp_a_curmbr_phone`, `contacts.website` from `pbp_a_org_website` and the in-network tier's `provider_directory_url` from `pbp_a_phys_web_addr`, an address written only when it is a URI with its scheme. Every new value quotes its cells. Over the contract year 2027 file: 6,872 plans, 0 errors, 0 schema failures; premium on 5,510, Part B reduction on 1,412, phone on 6,872, website on 457, directory link on 1,585. See [CMS Medicare Advantage PBP files](/docs/specification/medicare-advantage-pbp).
- **Marketplace importer.** `scripts/from-marketplace-puf.js` writes Benefit Plan Standard schema 1.2.0 (was 1.1.0), with `plan_identifiers` `hios_plan_id` and `hios_id`. It reads a third file, the Network PUF, now required, and writes its `NetworkURL` as the in-network tier's `provider_directory_url`, on the row whose `BusinessYear`, `StateCode`, `IssuerId`, `NetworkId` and `MarketCoverage` are the plan's (every one of the 20,670 medical plan variants of plan year 2026 has its row). The first excerpt quotes each file's `ImportDate` beside the download dates, and `download.json` can give 1 file its own date (`downloaded_files`). `OutOfServiceAreaCoverageDescription` and `OutOfCountryCoverageDescription` are quoted when filled. See [CMS Marketplace public files](/docs/specification/marketplace-public-files).
- **Accumulator tier ids `IN` and `OUT` (2026-10-21).** The Marketplace importer writes each accumulator's `network_tier` as `IN` or `OUT` (was `in-network` and `out-of-network`), as the Medicare Advantage importer does. The 2 hand-written examples on the v1.2.0 draft, `humana_example.json` and `scan_example.json`, wrote `in-network` on their 2 accumulators; those 4 values became `IN`, and their 2 Bundles were re-converted by the Benefit Plan Standard converter and republished on [FHIR InsurancePlan](/docs/specification/fhir-insuranceplan) with the same counts.
- **Examples and Bundles.** The 10 public-file examples and their Bundles are regenerated: the 5 `examples/*.pbp.json` (38 of 41 rows each) with the 5 PBP Bundles (16 placed, 22 listed by name), republished on this site, and the 5 `examples/*.puf.json` with their Bundles in `examples/fhir-puf/`. The 8 SBC Bundles are byte-identical. All 20 examples validate against the v1.2.0 draft.
- **HL7 FHIR validator, sixth and seventh runs.** Sixth run, 2026-10-20: the 10 regenerated public-file Bundles pass with 0 errors; 1 more warning on the Aetna PBP Bundle, a text-only `Point-of-service option` qualifier on the 14a row (17 on the 5 PBP Bundles). Seventh run, 2026-10-21: the 5 Marketplace Bundles and the 2 re-converted Summary of Benefits Bundles pass with 0 errors and the warnings of the sixth run (91 and 46). Record: `examples/fhir/VALIDATION.md` in the schema repository.
- **Accuracy checks.** `H1609-028-000.json` 65 checks, 47 match, 16 readings, 2 contradictions; `H2406-013-000.json` 83, 71, 12, 0; `68398FL0030058-01.json`, the first Marketplace check, 50, 39, 11, 0. The new checks cover the premium, preventive care, the member services phone, the website and the provider directory link. The 2 contradictions are on links, not cost shares: the Aetna Summary of Benefits prints `AetnaMedicare.com` and `AetnaMedicare.com/H1609-028`, the file gives "www.aetna.com/medicare" and "www.aetnamedicare.com/findprovider", and all 4 addresses resolved on 2026-10-20.
- **Medical MVP technical specification.** `docs/specs/rtb-medical-mvp/` in the schema repository, version 0.3.4, dated October 21, 2026: the Benefit Plan Standard's technical specification for the medical MVP of the CMS Health Tech Ecosystem Real-Time Benefits workgroup, a draft for the workgroup, not a workgroup decision. Its scripts: `scripts/build-rtb-dictionary.js` (the data dictionary), `scripts/build-rtb-crosswalk.js` (the crosswalk to the SBC InsurancePlan profile), `scripts/rtb-completeness.js` (the completeness count), `scripts/build-rtb-docx.js` (the Word copies of the 3 documents), `scripts/pbp-segment.js` (county to segment for a Medicare Advantage plan) and `scripts/publish-fhir.js --pledgee` (a pledgee's `index.json` and, in every Medicare Advantage release folder, `service-areas.json`). New page: [Medical MVP technical specification](/docs/specification/medical-mvp).

## Tooling and examples (2026-10-06)

No schema change. One addition to a non-normative vocabulary, below.

- **Importer.** `scripts/from-pbp.js` reads the CMS Medicare Advantage Plan Benefit Package (PBP) Benefits files for contract year 2027 and writes 1 BPS v1.2.0 document per plan. It builds all 6,872 HMO, HMO-POS, local PPO and regional PPO plans in the file with 0 errors, reading 30 benefits through `fhir/pbp-crosswalk.json`; the FHIR converter reads its output unchanged. See [CMS Medicare Advantage PBP files](/docs/specification/medicare-advantage-pbp).
- **Examples.** 5 examples, `examples/*.pbp.json`: UnitedHealthcare H2406-013, Humana H1036-068, Aetna H1609-028 (HMO-POS), UPMC for Life H5533-019 and SCAN H5425-140. 2 of them, H2406-013 and H1609-028, are checked against the carrier's 2027 Summary of Benefits with `scripts/pbp-sob-check.js`, 0 differences.
- **Bundles.** The 5 examples are converted into `examples/fhir/` and validated with the HL7 FHIR validator 7.0.0: 0 errors, 15 warnings. They are not published on this site; the 10 published Bundles are unchanged.
- **Docs.** New page, [How the data flows](/docs/specification/data-flow): the two CMS inputs, the two importers, the BPS document, the converter and the FHIR output in one diagram, with the command for each step.
- **Converter: point-of-service tier.** `scripts/to-insuranceplan.js` maps the `POS` tier of an HMO-POS plan to `out-of-network` with the text-only qualifier `Point-of-service option`. Before, it refused the tier. The reading is confirmed on the Aetna H1609-028 Summary of Benefits and CMS Medicare Plan Finder.
- **Vocabulary.** `HMO_POS` is added to `vocabularies/plan-types.json` (non-normative).

## Tooling and examples (2026-10-05)

No schema change.

- **Importer.** `scripts/from-marketplace-puf.js` reads the CMS Health Insurance Exchange public use files (Plan Attributes PUF and Benefits and Cost Sharing PUF) and writes 1 BPS v1.1.0 document per plan; the FHIR converter reads that output unchanged. 3 examples, `examples/*.puf.json`. See [CMS Marketplace public files](/docs/specification/marketplace-public-files).
- **Second in-network tier.** The converter maps a second in-network tier (`IN2`) to `in-network` with a cost-tier qualifier: `value-choice` only when the tier name says "Value Choice", otherwise text only.
- **Examples: deductible flags on silent cells.** A cost share whose SBC cell says nothing about the deductible is read from the issuer's annotation convention: `false` where the chart marks the cells where the deductible applies ("Deductible +", "after Deductible"; GatorCare, Florida Blue), `true` where it marks only "Deductible does not apply" (Aetna, Cigna), and otherwise from the SBC template footnote and the page 1 "services covered before you meet your deductible" answer (United). 35 flags corrected (United 25, Aetna PPO 1500 4, Aetna PPO 5000 4, GatorCare 2); the 4 Bundles are republished, 0 errors, 75 warnings unchanged. The rule is written out in `examples/README.md`.
- **Examples: limits and deductible flags from the source PDFs.** Each value is read from the example's source PDF in `examples/sources/`. The 8 FHIR Bundles in `examples/fhir/` are regenerated and re-validated.

## [Unreleased]: v1.2.0 draft

**Status:** draft, tagged [`v1.2.0-draft.1`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/releases/tag/v1.2.0-draft.1) on 2026-09-20, and `v1.2.0-draft.2` to `v1.2.0-draft.5` on 2026-10-21. Not a release. Every v1.0.0 and v1.1.0 document validates against it unchanged; every addition is optional. A final v1.2.0 release needs validation by two independent adopters, per the [governance policy](/docs/governance/versioning-release-policy). Full field-by-field detail with page evidence: [the changelog in the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md).

The draft carries three additive blocks.

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
- **Examples:** `scan_example.json` and `humana_example.json`, read from their Summary of Benefits, verified value by value against the cited pages, with both source PDFs alongside. They validate against the v1.2.0 draft only. Analysis and verification record: [docs/medicare-advantage-notes.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/medicare-advantage-notes.md).

### Added, 2026-10-20: the medical MVP
For the medical MVP technical specification of the CMS Health Tech Ecosystem Real-Time Benefits workgroup (`docs/specs/rtb-medical-mvp/` in the schema repository). 2 optional fields; nothing removed or renamed.
- `contacts`, an object with `member_services_phone` (string) and `website` (string, format `uri`), both optional and no other key.
- `network_tiers[].provider_directory_url` (string, format `uri`): a link a member can open to the plan's provider directory for this tier. An address with no scheme is not a URI; it is quoted in `source_references` and not written.
- Changed on 2026-10-21: the 2 `network_tier` descriptions, on the deductible and the out-of-pocket maximum accumulators, say the value is the `tier_id` of a tier in `network_tiers` (`IN`, `OUT`, `POS` or another tier id the document defines). The type is unchanged.
- **Vocabulary (non-normative):** `canonical-benefits.json` version 1.3.0, 118 entries, with `physical_and_speech_therapy`.

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
