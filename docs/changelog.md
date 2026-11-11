---
id: changelog
title: Changelog
sidebar_position: 5
---

# Changelog

This changelog lists all notable changes to the Benefit Plan Standard.  For a high‑level overview of changes in each release, see the [release notes](/docs/release-notes).  The format is based on [Keep a Changelog](https://keepachangelog.com/) and adheres to Semantic Versioning.

## Tooling and examples (2026-11-04 and 2026-11-11): no-limit entries, the Part D formulary importer, the Part D premium and Reductions in Cost Sharing

The schema changes of these dates are drafts 8 and 9 of 1.2.0, listed under [1.2.0] below. The wording follows [the changelog in the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md), entries of 2026-11-04 and 2026-11-11.

- **No-limit entries (2026-11-04).** `scripts/from-pbp.js` writes a limits entry with `unlimited` true and `value` null for every unlimited or no-maximum answer on a covered benefit, so an app can tell "no limit" from "not read". Covering plans with a limits entry, over the 6,872 plans of contract year 2027, before and after: meals 37 to 2,681 of 2,681, fitness 1,367 to 4,795 of 4,795, rides to medical appointments 1,551 to 1,816 of 1,816. The 5 PBP examples gain 38 such entries.
- **Part D formulary importer (2026-11-11).** `scripts/from-partd-formulary.js` reads the CMS monthly public use file "Prescription Drug Plan Formulary and Pharmacy Network Information" and writes a drug list once per formulary (`schema/v1.2.0/formulary.schema.json`) and a plan document per plan that points at its list. On release `2027_20261008`: 286 lists and 5,478 plans, all valid, 0 errors, 17 plans refused (3 suppressed, 14 of plan types the Medicare Advantage importer does not cover). New examples in `examples/partd-formulary/`: 5 lists and 5 plans; 2 are checked against the carrier's published drug list, 10 drugs each, 19 of 20 agree.
- **The Part D part of the premium (2026-11-11).** A stand-alone drug plan's document gains `premium` from the formulary file's `PREMIUM`, per month. A Medicare Advantage plan's premium in the PBP files leaves its Part D part out; the formulary importer writes that part as `premium.drug_amount`, and the Medicare Advantage importer says in `premium.notes`, on a plan with drug coverage, that its amount leaves it out. Checked on 3 plans, each adding up to its Summary of Benefits ($13 + $13 = $26, $13 + $105 = $118, $5 + $28 = $33).
- **Reductions in Cost Sharing (2026-11-11).** `scripts/from-pbp.js` reads Section D's Reductions in Cost Sharing groups, an amount per period that lowers the member's cost sharing for the services it lists: 1 benefit entry per group, `PBP_D_RICS_<n>`, with the amount as a `dollars` limit and the categories, delivery mode and deductible answer as conditions. 95 plans and 110 groups in 2027; 78 groups share the amount of a combined supplemental benefit group and take its `shared_limit_id`. `categories.json` version 1.2.0 (was 1.1.0), 38 codes, with `REDUCTIONS_IN_COST_SHARING`, served at `/vocabularies/v1.2.0/categories.json` beside the unchanged v1.1.0 file.
- **Accuracy checks (2026-11-11).** 10 UnitedHealthcare and AARP plans, 5 Medicare Advantage and 5 stand-alone drug plans in Florida, Texas and California, against their 2027 Summaries of Benefits, premium included: 453 checks, 424 match, 29 readings, 0 differences.
- **Bundles.** The 5 PBP Bundles change twice: on 2026-11-04 each inpatient hospital benefit gains a `BenefitLimitation` with `limitText` and `limitType` and no value, and on 2026-11-11 each premium entry gains a `comment`. They are republished on [FHIR InsurancePlan](/docs/specification/fhir-insuranceplan), and the index labels of the 7 Medicare Advantage Bundles now say they validate against v1.2.0, not v1.1.0. HL7 FHIR validator, twelfth and thirteenth runs, on all 20 Bundles: 0 errors. The 10 Bundles read from plan documents and the 5 Marketplace Bundles are unchanged.
- **Validator.** `scripts/validate.js` checks against 1.2.0 when no `--schema` is given (it was 1.1.0).

## Tooling and examples (2026-10-24): Part D in the Medicare Advantage importer

No schema change: the importer writes the `pharmacy` object and the pharmacy fields of the v1.2.0 draft 6. 2 additions to non-normative vocabularies, below. The wording follows [the changelog in the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md), entry of 2026-10-24.

- **Importer.** `scripts/from-pbp.js` reads the Part D files of the CMS PBP release. A Medicare Advantage plan with drug coverage gets its `pharmacy` object (the Part D deductible and its tiers, the $2,400 out-of-pocket threshold of 2027, the coverage stages, the drug tiers and the pharmacy networks) and 1 Part D benefit per tier, pharmacy network and day supply, plus 1 per tier after the threshold, at $0 for covered Part D drugs. Stand-alone Medicare Prescription Drug Plans get documents of their own, with the member services phone from the Part D phone column of the file. Over the 2027 file: 6,872 Medicare Advantage plans and 323 PDPs, 0 errors. See [CMS Medicare Advantage PBP files](/docs/specification/medicare-advantage-pbp).
- **Examples.** 2 PDPs, UnitedHealthcare S5921-383 and Wellcare S4802-146, join the 5 PBP examples, which gain their Part D benefits. Humana H1036-068 and UnitedHealthcare S5921-383 are checked against their 2027 Summary of Benefits on Part D: 46 and 43 checks, 0 differences.
- **Converter and Bundles.** The FHIR converter lists every Part D benefit by name only, keeps the Part D deductible and threshold as plan-level costs, and does not convert a stand-alone Part D plan. The 5 PBP Bundles are regenerated and republished on this site (16 placed, 55 to 89 listed by name); HL7 FHIR validator, eighth run: 0 errors, the same 17 warnings. The 10 Bundles read from plan documents are unchanged.
- **Vocabulary.** `canonical-benefits.json` version 1.4.0 (was 1.3.0), 124 entries: 6 pharmacy keys for the CMS Part D tier labels (`nonpreferred_drugs`, `select_care_drugs`, `injectable_drugs`, `vaccine_drugs`, `supplemental_drugs`, `select_diabetic_drugs`), served at `/vocabularies/v1.4.0/canonical-benefits.json` beside the unchanged v1.3.0 file; the `canonical-benefits` CodeSystem is rebuilt (version 1.4.0, 124 concepts) and republished. `markets.json` version 1.2.0 (was 1.1.0), served at `/vocabularies/v1.2.0/markets.json` beside the unchanged v1.1.0 file: `medicare_part_d`. The validation page gives the canonical vocabulary's count and version, 124 keys in version 1.4.0.

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

## [1.2.0] – 2026-11-13

**Status:** released on 2026-11-13, tagged `v1.2.0`, after 9 published drafts: [`v1.2.0-draft.1`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/releases/tag/v1.2.0-draft.1) on 2026-09-20, `v1.2.0-draft.2` to `v1.2.0-draft.5` on 2026-10-21, `v1.2.0-draft.6` on 2026-10-24, which wires the pharmacy module v0.2.1 into core and adds `moop_ref`, `v1.2.0-draft.7` on 2026-11-01, which adds 6 optional properties motivated by the GatorCare Prime EPO 2026 pharmacy SBC, `v1.2.0-draft.8` on 2026-11-04 and `v1.2.0-draft.9` on 2026-11-11. The release schema is draft 9's; only its root description changes, which no longer says DRAFT. Every v1.0.0 and v1.1.0 document validates against it unchanged; every addition is optional. The release rule of the [governance policy](/docs/governance/versioning-release-policy) asks for 2 independent adopters, and the 2 on record in [the adopters file](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md) of the schema repository meet it. Summary and migration guidance: [release notes](/docs/release-notes). Full field-by-field detail with page evidence: [the changelog in the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md).

1.2.0 carries 7 additive blocks, each dated as it was published.

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

### Added, 2026-10-24: the pharmacy module v0.2.1 in core, and `moop_ref` (draft 6)
Every field is optional; the 20 examples validate unchanged.
- The core `pharmacy` object gains the rest of the module's: `formulary_tiers`, `pharmacy_networks`, `formulary_items`, `formulary_reference` and `mail_order_supply_multiplier`, with the module's shapes copied into the core schema, so a validator needs only the core file.
- `benefits[]` items gain the module's benefit extension fields for `benefit_type: "pharmacy"`: `formulary_tier_id`, `pharmacy_network_id`, `coverage_stage_id`, `day_supply`, `drug_examples`, `step_therapy_required` and `quantity_limit`. The validator warns, and does not fail, when one is on another benefit type or names an id the plan's `pharmacy` object does not define.
- `cost_shares[].moop_ref` says which out-of-pocket maximum `applies_to_moop` refers to, as `deductible_ref` does for the deductible: `medical` or `pharmacy` (the Part D threshold); absent means medical. The gap was found by RxCare on October 23, 2026.
- Two adopters are on record in [ADOPTERS.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md) in the schema repository: [RxCare](https://rxcare.ai) (October 23, 2026) and [MyDigiRecords](https://mydigirecords.com) (October 26, 2026). That meets the release rule's adopter condition.

### Added, 2026-11-01: a family pharmacy deductible, a floor under a coinsurance, where a not-covered row points, and which document a citation is in (draft 7)
Every field is optional. 21 of the 22 examples are untouched and validate against draft 7. The motivating document is the GatorCare Prime EPO 2026 pharmacy SBC.
- `pharmacy.deductible.family_amount`: the family pharmacy deductible, when the plan prints one beside the individual amount ("$125 Individual/$500 Family Pharmacy Calendar Year Deductible").
- `cost_shares[].min_amount` and `min_basis`: the dollar floor under a cost-share step, the mirror of `max_amount` and `max_basis` ("25% Coinsurance with $10 Min. to $20 Max.").
- `network_cost_shares[].covered_under` and `not_covered_reason`: why a row is not covered, and which other benefit the document points to. `covered_under` records where the document sends the member, not a statement that the other benefit pays.
- `source_references[].document`: which source document a citation is in, when a plan was read from more than 1.
- The pharmacy module is v0.2.2, with `deductible.family_amount`, in a new folder; v0.2.1 is unchanged and still served at its address. Core copies v0.2.2.
- `gatorcare_example.json` moves to schema 1.2.0 and gains its pharmacy side, 3 medical rows and verbatim citations that each name their PDF. Its Bundle, `gatorcare-prime-epo.json`, changes at the same address: 36 benefits placed and 11 listed; 0 errors from the HL7 validator on all 20 Bundles. The other 19 are byte-identical.
- The converter carries the new fields in `bps-cost-share`, `bps-benefit`, `bps-source-reference` and a second `generalCost` entry, and `fhir/carin-sbc-crosswalk.json` has 3 more keys, 41 in all.

### Added, 2026-11-04: a limit that the source states as no limit (draft 8)
1 optional property. Every document valid against draft 7 is valid against draft 8 unchanged.
- `benefits[].limits[].unlimited` (boolean or null): true says the source states that the benefit has no limit of the entry's `type`; `value` is then null, and `period`, `scope`, `shared_limit_id` and `carryover` do not apply. Any other entry takes a number in `value`, as before. Absent, null or false means a limit with a value, the reading before draft 8.
- The motivation: when a 2027 Medicare Advantage plan files "no maximum" or "unlimited" for an extra benefit, a document could not say so, and an app could not tell "no limit" from "not read".

### Added, 2026-11-11: room for the CMS Part D formulary files, and the Part D part of the premium (draft 9)
Every addition is optional, and the 2 properties that stop being required leave every draft 8 document valid. The motivation is the CMS monthly public use file "Prescription Drug Plan Formulary and Pharmacy Network Information": release `2027_20261008` lists 286 formularies shared by 5,492 plans, up to 660 plans on 1 list.
- `pharmacy.formulary_reference.formulary_version` and `formulary_items_url`: the version of the formulary the items were read from, and where the plan's drug list is published as a formulary list document.
- `pharmacy.formulary_items[].coverage_basis`, `negotiation_selected_drug`, `capped_benefit` and `source_references`: whether a drug is a Part D drug or an excluded drug the plan covers, whether it is selected for Medicare drug price negotiation, the excluded drugs file's capped benefit flag, and the row an item was read from.
- `premium.drug_amount`: the Part D part of a Medicare Advantage plan's premium, when the source gives it apart; `amount` is then the premium without it, and the monthly plan premium is their sum.
- `formulary_items[].drug_name` and `quantity_limit_detail.units` are no longer required: the CMS formulary files name no drug and give a quantity limit with no unit.
- `schema/v1.2.0/formulary.schema.json`, a new schema beside core for a drug list written once for the plans that share it, served at [/schema/v1.2.0/formulary.schema.json](https://benefitplanstandard.org/schema/v1.2.0/formulary.schema.json).
- The pharmacy module is v0.2.3, with the same changes, in a new folder served at [/modules/pharmacy/v0.2.3/pharmacy.schema.json](https://benefitplanstandard.org/modules/pharmacy/v0.2.3/pharmacy.schema.json); v0.2.2 is unchanged and still served. Core copies v0.2.3.
- **Vocabulary (non-normative):** `categories.json` version 1.2.0, 38 codes, with `REDUCTIONS_IN_COST_SHARING`.

### Migration from 1.1.0
- A 1.1.0 document needs no change. To say it is a 1.2.0 document, set `schema_version` to "1.2.0". Compared with 1.1.0, no property is removed, none becomes required and no type is narrowed.
- `node scripts/validate.js plan.json` validates against 1.2.0; `--schema schema/v1.1.0/benefit-plan.schema.json` keeps the 1.1.0 check.
- A document written against a 1.2.0 draft validates against 1.2.0 as it is.
- What a reader written for 1.1.0 can misread in a 1.2.0 document: `limits[].value` is null when `unlimited` is true; `premium.amount` is not the whole premium when `premium.drug_amount` is present; `pharmacy.formulary_items[].drug_name` and `quantity_limit_detail.units` can be absent; an accumulator's `network_tier` is the `tier_id` of a tier in `network_tiers`; and a benefit can have no `canonical_key` and no `network_cost_shares` rows, such as a Reductions in Cost Sharing entry, whose amount is a `dollars` limit.

### Deferred
- Optional supplemental packages (riders): a name, a premium, and the benefits that apply only when a member buys the package.
- Population-specific cost sharing, such as Extra Help replacing the Part D amounts for members who qualify.

### Not in this release
- The validator does not flag a plan-identity value that has no source reference, and the rule that `market` comes from a dataset with provenance is not written into a tool (items 1 and 2 of the v1.2.0 list in the schema repository's roadmap).

### Not changed
- `schema/v1.0.0` and `schema/v1.1.0` are frozen. The 7 SBC examples that declare 1.1.0 (all 8 but `gatorcare_example.json`, which moved to 1.2.0 at draft 7) validate against v1.1.0 and 1.2.0.

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
