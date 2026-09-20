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
- **Release Example Plans** — Publish normalized plans for at least ten carriers, covering commercial and Medicare lines of business.  Eight commercial and marketplace plans from the SBC are published; two Medicare Advantage plans (SCAN, Humana) are on `main` against the v1.2.0 draft, September 2026.
- **Standards Website** — Launched at https://benefitplanstandard.org with documentation, governance charter, and adoption resources.
- **Draft v1.2.0 — CARIN alignment and Medicare Advantage** — In draft, tagged `v1.2.0-draft.1` (September 2026).  Reconciles the three CARIN Digital Insurance Card changes merged in June and adds what a CMS Summary of Benefits carries that the SBC does not.  Needs two independent adopter validations to release.  See the [specification roadmap](../specification/roadmap.md).  The formulary layer is tracked as the pharmacy module.
- **Gather Community Feedback** — Host virtual workshops with carriers, brokers, and insurtechs to refine the next modules.

## Medium Term (2026–2027)

- **Release v1.2.0, and ship the pharmacy module's formulary layer** — Take v1.2.0 from draft to release once two adopters have validated it; complete the schema, field definitions, and crosswalk for drug-level formulary coverage in the pharmacy module.
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
