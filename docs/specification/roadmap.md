---
id: roadmap
title: Specification Roadmap
sidebar_label: Roadmap
---

# Benefit Plan Standard — Specification Roadmap

This roadmap tracks the technical direction of the Benefit Plan Standard: what has shipped, what is in active planning, and what is on the longer-term horizon.

It is updated each release cycle. For organizational goals and governance planning, see the [Governance Roadmap](../governance/roadmap.md).

---

# ✅ Released

## v1.2.0: Released (November 2026)

**Status:** Released on November 13, 2026, tagged `v1.2.0` · Published as 9 drafts: `v1.2.0-draft.1` on September 20, 2026, `v1.2.0-draft.2` to `v1.2.0-draft.5` on October 21, 2026, `v1.2.0-draft.6`, which wires the pharmacy module v0.2.1 into core and adds `moop_ref`, on October 24, 2026, `v1.2.0-draft.7`, which adds 6 optional properties motivated by the GatorCare Prime EPO 2026 pharmacy SBC, on November 1, 2026, `v1.2.0-draft.8` on November 4, 2026 and `v1.2.0-draft.9` on November 11, 2026 · Backward-compatible with v1.0.0 and v1.1.0

v1.2.0 grew in the steps below. The formulary layer is built as the [pharmacy module](/docs/specification/modules) and is tracked there; draft 6 copies the module's shapes into core.

- **CARIN Digital Insurance Card alignment (July 2026).** Three `InsurancePlan` changes were merged into the HL7 CARIN Digital Insurance Card IG on June 25, 2026: multi-tier cost sharing, deductible applicability, and structured benefit limitation. The draft reconciles them: `tier_class`, `parent_tier_id` and `provider_set` on network tiers, and `raw_text` on limits. Two of the three were already expressible since v1.0.0 and are covered by mapping notes.
- **Medicare Advantage (September 2026).** Two 2026 CMS Summary of Benefits documents (SCAN Classic HMO, Los Angeles County; Humana Gold Plus H1036-025 HMO) were read end to end and mapped against the schema. Fourteen constructs had no home; twelve are added: regulator plan identifiers, service area, premium, a Part D accumulator set, day-range copays, caps and ranges on cost shares, coverage basis (Medicare-covered versus supplemental), either/or benefit groups, allowance carryover, limit scope and shared limits, and per-benefit source references. Twelve vocabulary categories cover the benefit areas the Summary of Benefits prices and the SBC does not, including hearing, dental, vision, transportation, over-the-counter allowances, meals and in-home support. Two worked examples, read from the Summary of Benefits and page-cited, validate against the draft. On October 6, 2026, 5 more Medicare Advantage plans were imported from the CMS PBP files (see [CMS Medicare Advantage PBP files](/docs/specification/medicare-advantage-pbp)).
- **The medical MVP (October 20, 2026).** The Benefit Plan Standard schema 1.2.0 draft gained 2 optional fields for the [medical MVP technical specification](/docs/specification/medical-mvp) of the CMS Health Tech Ecosystem Real-Time Benefits workgroup: `contacts` (the member services phone and website) and `network_tiers[].provider_directory_url` (a link to the plan's provider directory for a tier). The canonical benefit vocabulary moved to version 1.3.0, 118 canonical keys, with `physical_and_speech_therapy` added. On October 21, 2026 the draft's `network_tier` description became the `tier_id` of a tier in `network_tiers`, which the Medicare Advantage importer (`scripts/from-pbp.js`) and the Marketplace importer (`scripts/from-marketplace-puf.js`) both write, and the draft was tagged `v1.2.0-draft.2` and `v1.2.0-draft.3`. Both importers now write Benefit Plan Standard schema 1.2.0 documents.
- **The pharmacy module in core (October 24, 2026).** Draft 6, tagged `v1.2.0-draft.6`, gives the core `pharmacy` object every property of the pharmacy module v0.2.1 (formulary tiers, pharmacy networks, formulary items and the formulary reference, with the module's shapes copied into the core schema) and gives `benefits[]` items the module's benefit extension fields. It adds `cost_shares[].moop_ref`, which says whether a cost share counts toward the medical maximum or the Part D out-of-pocket threshold, as `deductible_ref` does for the deductible; RxCare found the gap on October 23, 2026. The first adopter is on record in [ADOPTERS.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md).
- **A family pharmacy deductible, a floor under a coinsurance, where a not-covered row points (November 1, 2026).** Draft 7, tagged `v1.2.0-draft.7`, adds 6 optional properties motivated by the GatorCare Prime EPO 2026 pharmacy SBC: `pharmacy.deductible.family_amount` (with the pharmacy module v0.2.2), `cost_shares[].min_amount` and `min_basis`, `network_cost_shares[].covered_under` and `not_covered_reason`, and `source_references[].document`.
- **A limit that the source states as no limit (November 4, 2026).** Draft 8, tagged `v1.2.0-draft.8`, adds `limits[].unlimited`: an entry with `unlimited` true and `value` null says the source states no limit of its type, so an app can tell "no limit" from "not read". The Medicare Advantage importer writes one for every unlimited or no-maximum answer on a covered benefit.
- **Room for the CMS Part D formulary files, and the Part D part of the premium (November 11, 2026).** Draft 9, tagged `v1.2.0-draft.9`, adds `formulary_version` and `formulary_items_url` on the formulary reference, `coverage_basis`, `negotiation_selected_drug`, `capped_benefit` and `source_references` on a formulary item, makes a formulary item's `drug_name` and a quantity limit's `units` optional, and adds `schema/v1.2.0/formulary.schema.json` for a drug list that many plans share, with the pharmacy module v0.2.3. It adds `premium.drug_amount`, the Part D part of a Medicare Advantage plan's premium, which the PBP files leave out of the premium they give. The Part D formulary importer, `scripts/from-partd-formulary.js`, writes them.
- **Deferred to a later version:** optional supplemental packages (riders) and population-specific cost sharing such as Extra Help.

See the [changelog](/docs/changelog) for the field list and the schema repository for the [full record with page evidence](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md).

### What made it a release

- Validation by two independent adopters, per the [versioning and release policy](/docs/governance/versioning-release-policy): [RxCare](https://rxcare.ai) and [MyDigiRecords](https://mydigirecords.com), recorded in [ADOPTERS.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md).

### Carried past the release

This roadmap listed 2 more conditions while v1.2.0 was a draft, and both go on after it: more Medicare Advantage plans and plan types worked through (beyond the 2 read from the Summary of Benefits, the 5 imported from the PBP files and the 10 checked against their 2027 Summaries of Benefits on November 11, 2026), and the reference implementation producing v1.2.0 output for the existing SBC corpus with no result changes.

## v1.1.0 — Released (May 2026)

**Status:** Released · **Shipped:** May 2026 · Backward-compatible with v1.0.0

v1.1.0 is the first minor release after six months of production extraction experience across real carrier SBCs and EOCs. Every v1.0.0 document continues to validate against v1.1.0 unchanged. Highlights:

- **Expanded accumulators** — separate in- and out-of-network deductible and OOP-max slots, plus per-slot `period`, `network_tier`, `embedded`, and `applies_to` metadata. Closes the v1.0.0 gap where PPO plans with distinct out-of-network accumulators could not be fully represented.
- **Pharmacy module foundations** — the `benefit_type` discriminator (default `medical`) lets pharmacy, dental, vision, and behavioral-health benefits share the core schema. This is the hook the formal modules build on, with pharmacy first.
- **Enhanced cost-sharing structures** — `canonical_key` and `raw_label` on benefit rows for traceability, and an optional `notes` field on `cost_shares[]` items.
- **Plan identity** — `plan_year`, an explicit `coverage_period` (`start_date` / `end_date`), and a top-level `market` field.
- **Recommended vocabularies** — 100 canonical benefits, 25 categories, 12 markets, and 12 plan types (non-normative).
- **FHIR alignment guide** — field-by-field BPS ↔ FHIR R4 `InsurancePlan` mapping with a worked example.

See the [v1.1.0 release notes](/docs/release-notes) and [changelog](/docs/changelog) for full detail.

## v1.0.0 — Released (2025)

Foundational release: the core JSON schema for medical benefit plans, the field-definition matrix, the initial seven-carrier crosswalk, and the documentation site.

---

# 🔭 Future Modules & Enhancements

Targeted for releases beyond v1.2.0, in rough priority order:

- **Pharmacy module, formulary layer** — drug-to-tier mapping, formulary references, NDC and RxNorm identifiers, CMS and carrier formulary file ingestion, and drug-level coverage conditions (step therapy, prior authorization, quantity limits). GLP-1 and specialty drugs are the driving use case. The pharmacy module is at v0.2.3, whose shapes v1.2.0 carries, and the Part D formulary importer reads the CMS monthly formulary files since November 11, 2026. Still open: drug names (the CMS files name no drug), the unit of a quantity limit (the files give none) and carrier formulary files. See [Modules](/docs/specification/modules).
- **Medicare Advantage, remaining constructs** — riders and population-specific cost sharing, plus Medicaid program documents, which have not been worked through at all.
- **Behavioral Health Module** — tele-behavioral rules, therapy vs. psychiatry cost-sharing, visit limits, MAT coverage.
- **Dental & Vision Modules** — annual maximums, preventive/basic/major coverage, orthodontia, waiting periods; exams, frames, lenses, and contact-lens allowances. v1.2.0 already carries the Medicare Advantage allowances and per-ear limits; a full module would add the commercial dental and vision plan structures.
- **Telehealth Module** — virtual PCP and urgent care, remote patient monitoring, virtual behavioral health.
- **Crosswalk expansion** — additional carriers (Kaiser, Molina, Oscar, Ambetter, regional MA plans) to improve ingestion accuracy.
- **Reference-implementation alignment** — keep HealthPlanAPI and reference parsers in step with the published schema.
- **Refreshed FHIR alignment** — update the mapping once the HL7 R6 `InsurancePlan` ballot stabilizes.

---

# 🔧 Compatibility Commitment

Backward compatibility is a core principle. Minor releases (v1.x) add only optional fields and modules; no v1.0.0 or v1.1.0 document will be invalidated by a v1.2.0 schema. Any change requiring migration ships with a documented migration path.

---

# 🙋 How to Contribute

- Join the discussions on GitHub
- Submit feedback via Issues
- Participate in module workgroups — the formulary module workgroup is forming now
- Provide real plan and formulary examples for module testing
