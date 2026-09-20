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

# 🧭 In Draft

## v1.2.0 — CARIN alignment and Medicare Advantage (draft)

**Status:** Draft, tagged `v1.2.0-draft.1` on September 20, 2026 · Backward-compatible with v1.0.0 and v1.1.0 · Needs two independent adopter validations to release

The v1.2.0 draft grew in two steps, and neither is the formulary layer that an earlier version of this page described. The formulary layer is being built as the [pharmacy module](/docs/specification/modules) and is tracked there.

- **CARIN Digital Insurance Card alignment (July 2026).** Three `InsurancePlan` changes were merged into the HL7 CARIN Digital Insurance Card IG on June 25, 2026: multi-tier cost sharing, deductible applicability, and structured benefit limitation. The draft reconciles them: `tier_class`, `parent_tier_id` and `provider_set` on network tiers, and `raw_text` on limits. Two of the three were already expressible since v1.0.0 and are covered by mapping notes.
- **Medicare Advantage (September 2026).** Two 2026 CMS Summary of Benefits documents (SCAN Classic HMO, Los Angeles County; Humana Gold Plus H1036-025 HMO) were read end to end and mapped against the schema. Fourteen constructs had no home; twelve are added: regulator plan identifiers, service area, premium, a Part D accumulator set, day-range copays, caps and ranges on cost shares, coverage basis (Medicare-covered versus supplemental), either/or benefit groups, allowance carryover, limit scope and shared limits, and per-benefit source references. Twelve vocabulary categories cover the benefit areas the Summary of Benefits prices and the SBC does not, including hearing, dental, vision, transportation, over-the-counter allowances, meals and in-home support. Two worked examples, keyed by hand and page-cited, validate against the draft.
- **Deferred to a later version:** optional supplemental packages (riders) and population-specific cost sharing such as Extra Help.

See the [changelog](/docs/changelog) for the field list and the schema repository for the [full record with page evidence](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md).

### What would make it a release

- Validation by two independent adopters, per the [versioning and release policy](/docs/governance/versioning-release-policy).
- More Medicare Advantage plans and plan types worked through, beyond the first two.
- The reference implementation producing v1.2.0 output for the existing SBC corpus with no result changes.

---

# 🔭 Future Modules & Enhancements

Targeted for releases beyond v1.2.0, in rough priority order:

- **Pharmacy module, formulary layer** — drug-to-tier mapping, formulary references, NDC and RxNorm identifiers, CMS and carrier formulary file ingestion, and drug-level coverage conditions (step therapy, prior authorization, quantity limits). GLP-1 and specialty drugs are the driving use case. In draft as pharmacy module v0.2.x; see [Modules](/docs/specification/modules).
- **Medicare Advantage, remaining constructs** — riders and population-specific cost sharing, plus Medicaid program documents, which have not been worked through at all.
- **Behavioral Health Module** — tele-behavioral rules, therapy vs. psychiatry cost-sharing, visit limits, MAT coverage.
- **Dental & Vision Modules** — annual maximums, preventive/basic/major coverage, orthodontia, waiting periods; exams, frames, lenses, and contact-lens allowances. The v1.2.0 draft already carries the Medicare Advantage allowances and per-ear limits; a full module would add the commercial dental and vision plan structures.
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
