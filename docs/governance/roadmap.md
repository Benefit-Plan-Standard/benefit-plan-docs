---
id: roadmap
title: Roadmap
sidebar_position: 3
---

# Roadmap

This roadmap outlines planned features and releases for the Benefit Plan Standard.  The dates are tentative and may be adjusted as the community evolves.

## Near Term (2025–2026)

- **Publish v1.0.0 Specification** — Completed (2025).  The first formal release of the core schema, field definitions, and crosswalk tables.
- **Release v1.1.0** — Completed (May 2026).  Expanded accumulators, pharmacy module foundations, and enhanced cost-sharing structures, backward-compatible with v1.0.0.  See the [v1.1.0 release notes](/docs/release-notes).
- **Release Example Plans** — Publish normalized plans for at least ten carriers, covering commercial and Medicare lines of business.  Eight commercial and marketplace plans from the SBC are published; two Medicare Advantage plans (SCAN, Humana) are on `main` against v1.2.0, September 2026, five more are imported from the CMS PBP files, October 2026, and 2 stand-alone Medicare Part D plans and 5 Part D drug lists followed in October and November 2026.
- **Standards Website** — Launched at https://benefitplanstandard.org with documentation, governance charter, and adoption resources.
- **Release v1.2.0, CARIN alignment, Medicare Advantage and Medicare Part D.** Completed (November 13, 2026), tagged `v1.2.0`, after 9 published drafts: `v1.2.0-draft.1` (September 2026), `v1.2.0-draft.2` to `v1.2.0-draft.5` (October 21, 2026), `v1.2.0-draft.6` (October 24, 2026), which wires the pharmacy module v0.2.1 into core and adds `moop_ref` for Part D cost shares, `v1.2.0-draft.7` (November 1, 2026), which adds 6 optional properties motivated by the GatorCare Prime EPO 2026 pharmacy SBC, `v1.2.0-draft.8` (November 4, 2026), which adds `limits[].unlimited`, and `v1.2.0-draft.9` (November 11, 2026), which makes room for the CMS Part D formulary files and adds `premium.drug_amount`.  Reconciles the three CARIN Digital Insurance Card changes merged in June and adds what a CMS Summary of Benefits carries that the SBC does not.  Its third step, on October 20, 2026, adds 2 optional fields for the medical MVP technical specification of the CMS Health Tech Ecosystem Real-Time Benefits workgroup (`contacts`, `network_tiers[].provider_directory_url`) and the canonical benefit vocabulary 1.3.0 (118 canonical keys, `physical_and_speech_therapy` added).  Two independent adopters validated it: [RxCare](https://rxcare.ai) and [MyDigiRecords](https://mydigirecords.com), recorded in [ADOPTERS.md](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md).  See the [release notes](/docs/release-notes) and the [specification roadmap](../specification/roadmap.md).  The formulary layer is tracked as the pharmacy module.
- **Gather Community Feedback** — Host virtual workshops with carriers, brokers, and insurtechs to refine the next modules.

## Medium Term (2026–2027)

- **Ship the pharmacy module's formulary layer.** Complete the schema, field definitions, and crosswalk for drug-level formulary coverage in the pharmacy module. v1.2.0 carries the pharmacy module v0.2.3 and the Part D formulary importer reads the CMS monthly formulary files; drug names and the unit of a quantity limit, which those files do not give, are still open.
- **Begin Behavioral Health Module** — Define fields for mental health and substance use benefit nuances.
- **Expand Carrier Crosswalk** — Incorporate additional carriers (Kaiser, Molina, Oscar, Ambetter, etc.) and update mapping guidance.
- **Build Open Source Ingestion Tools** — Provide reference parsers and transformation scripts for PDFs and DOCX documents.

## Long Term (2027 and Beyond)

- **Dental and Vision Modules** — Cover annual maximums, orthodontic benefits, eye care, and device allowances.
- **Utilization Management Module** — Standardize prior authorization, step therapy, and referral requirements across carriers.
- **Regulatory Alignment** — Work with CMS and state regulators to encourage adoption of the standard for public reporting.
- **Certification Program** — Establish a certification process for vendors and carriers implementing the standard correctly.
- **Internationalization** — Adapt the model for health systems outside the United States.

This roadmap is fluid and will evolve as the community grows.  To suggest changes or volunteer to lead a module, please open an issue in the schema repository or join the discussions.
