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

# 🧭 In Planning

## v1.2.0 — Formulary & Drug-Level Coverage (Targeted)

**Status:** In planning · **Target:** next minor release

v1.1.0 established pharmacy *foundations* (the `benefit_type` discriminator and pharmacy cost-sharing structures). v1.2.0 builds the **formulary layer** on top of that foundation — moving from "this plan has a pharmacy benefit" to "this drug is covered at this tier under these conditions." Specialty-drug economics, and **GLP-1 coverage** in particular, are the driving use case: plans increasingly differentiate on which drugs sit on which tier and under what utilization-management rules, and that detail cannot be expressed today.

### 🧩 Formulary Module

- **Drug-to-tier mapping** — associate individual drugs (or drug groups) with the formulary tiers already modeled in the pharmacy structures.
- **Formulary references** — link a plan to a specific formulary so multiple plans can share one published drug list, and a plan can be re-pointed as formularies are revised.

### 🔗 Drug Identification

- **NDC and RxNorm code references** — standardized drug identifiers (National Drug Code and RxNorm RxCUI) so drug-to-tier mappings resolve unambiguously across data sources.

### 📥 Formulary Data Integration

- **CMS formulary data** — ingest Medicare Part D formulary files so Part D and MA-PD plans can be populated from the authoritative public source.
- **Carrier-published formulary files** — support the formulary file formats carriers publish directly, for commercial and Medicare lines alike.

### 🔧 Drug-Level Coverage Conditions

Extend the existing coverage-condition model so that step therapy, prior authorization, and quantity limits can be expressed **at the individual drug level** — not just at the benefit-category level — which is where specialty and GLP-1 utilization management actually lives.

### 🎯 Driving Use Case — GLP-1 & Specialty Drugs

GLP-1s and other high-cost specialty drugs are reshaping plan design. v1.2.0 is scoped so that "is drug X covered, on what tier, and under what prior-authorization / step-therapy / quantity rules" is answerable directly from a normalized plan document.

---

# 🔭 Future Modules & Enhancements

Targeted for releases beyond v1.2.0, in rough priority order:

- **Behavioral Health Module** — tele-behavioral rules, therapy vs. psychiatry cost-sharing, visit limits, MAT coverage.
- **Dental & Vision Modules** — annual maximums, preventive/basic/major coverage, orthodontia, waiting periods; exams, frames, lenses, and contact-lens allowances.
- **Telehealth Module** — virtual PCP and urgent care, remote patient monitoring, virtual behavioral health.
- **Supplemental Benefits Module** — OTC allowances, transportation, meal delivery, fitness, hearing aids.
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
