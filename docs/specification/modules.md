---
id: modules
title: Extensible Modules
sidebar_position: 2
---

# Extensible Modules

The core Benefit Plan Standard provides a flexible backbone for plan metadata, network tiers, accumulators, benefit rows, and limits.  Certain lines of business and domain‑specific needs require additional structures.  To accommodate these without bloating the core schema, the standard defines **extensible modules**.

Modules are optional extensions that build on the core schema.  Each module defines its own JSON schema, field definitions, validation rules and mapping guidance.  Modules allow carriers and integrators to add specialized data while maintaining compatibility with the core model.

## Current Modules

The following modules are planned for upcoming releases:

- **Pharmacy Module** — Captures formulary tiers, retail vs. mail cost shares, pharmacy deductible, day‑supply limits, and DAW (dispense as written) penalties.
- **Behavioral Health Module** — Adds condition codes and benefit items specific to mental health and substance use services, including therapy bundles and inpatient/residential coverage nuances.
- **Dental and Vision Module** — Defines fields for annual maximums, per tooth/eye visit limits, waiting periods and orthodontia benefits.
- **Accumulator Groups Module** — Allows multiple deductibles (e.g., pharmacy vs. medical), tier‑specific accumulators, embedded vs. non‑embedded logic, and cross‑accumulation flows.
- **Utilization Management Module** — Encodes prior authorization, referral requirements, step‑therapy rules and other authorization conditions.

## Module Design Principles

- **Separation of concerns** — Modules only extend the core where necessary.  Pharmacy data should not pollute medical benefits.
- **Backwards compatibility** — The core schema remains valid for plans without modules.  Modules add optional structures rather than change existing fields.
- **Clear versioning** — Each module is versioned separately (e.g., Pharmacy v1.0, v1.1) and references the core schema version it depends on.
- **Mapping guidance** — Each module includes crosswalk tables and examples for how carriers implement the specialized domain.

## Building a Module

To propose a new module:

1. **Define the scope and justification** — Describe what the module covers and why it cannot be handled by the core schema.
2. **Draft a JSON Schema** — Create a draft JSON schema file in the `modules/` directory of the schema repository.
3. **Write field definitions** — Provide a document describing the fields, types, and usage.
4. **Add a crosswalk** — Map the new fields to at least two carriers’ terms and provide examples.
5. **Submit a pull request** — Open a PR in the `benefit-plan-schema` repository for review by the governing committee.

Modules are critical for evolving the standard while maintaining stability.  For more information on contributing new modules, see [Governance / Roadmap](../governance/roadmap.md).
