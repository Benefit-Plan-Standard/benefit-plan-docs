---
id: release-notes
title: Release Notes
sidebar_position: 6
---

# Release Notes

This page provides high-level summaries for each published version of the Benefit Plan Standard.  
For a detailed, chronological record of all technical changes, see the **Changelog**.

---

# v1.0.0 — Foundational Release (Draft)

**Release Date:** June 2025  
**Status:** Draft (public preview)

The **v1.0.0** release represents the foundational publication of the Benefit Plan Standard, defining the structural, semantic, and operational elements for a unified benefit-plan representation. This release establishes the baseline for interoperability across carriers and for downstream applications that consume normalized health plan data.

---

## 🎯 Goals of v1.0.0

- Establish a **stable, long-term JSON schema** for representing all major components of medical benefit plans.  
- Provide a **repeatable normalization model** capable of absorbing the diversity found in carrier SBCs, EOCs, and benefit booklets.  
- Create a **transparent governance** and versioning framework to support future expansion.  
- Deliver a **developer-friendly documentation site** and onboarding pathway.  
- Ensure this standard is practical and deployable for real ingestion pipelines.

---

## 📐 Schema & Specification

### ✔ Initial Schema Backbone  
A formal schema backbone was created, defining the core structural domains:

- **Plan metadata** (plan identifiers, market, carrier, year, type)  
- **Network tiers** and structurally consistent cost-sharing layers  
- **Accumulator model** (deductibles, out-of-pocket limits)  
- **Benefits model** (services, categories, cost shares)  
- **Limits structure** (quantity limits, time periods)  
- **Conditions model** (prior auth, referral requirements, execution notes)  
- **Source referencing** (page and text excerpt mapping for ingestion traceability)

This structure supports both commercial health plans and Medicare Advantage mappings.

---

## 🧩 Module Definitions

Version 1.0.0 introduces the **modular architecture**, allowing future expansions without breaking earlier versions.  
The initial modules include:

- **Core Plan Metadata Module**  
- **Network Cost-Share Module**  
- **Accumulator Module**  
- **Benefit Definitions Module**  
- **Limits & Conditions Module**  
- **Source Mapping Module**

These modules form the minimum required set for end-to-end plan normalization.

---

## 🗂 Field Definition Matrix

A **comprehensive, machine-aligned definition matrix** was added, listing:

- Every normalized field  
- Field type  
- Required/optional status  
- Semantic meaning  
- Examples  
- Alignment with carrier terminology  
- Future expansion notes  

This matrix strengthens interoperability and ensures consistent ingestion rules across carriers.

---

## 🔄 Carrier Crosswalk Framework

The initial crosswalk framework was introduced, with support for:

- **Blue Cross Blue Shield**  
- **GatorCare**  
- **SCAN**  
- **Aetna**  
- **UnitedHealthcare**  
- **Cigna**  
- **Humana**

The crosswalk provides:

- Vocabulary harmonization  
- Mapping rules  
- Exception handling patterns  
- Notes on ambiguous carrier language  
- Placeholders for additional carriers (Kaiser, Molina, Oscar, Ambetter)

A publicly accessible **live Google Sheet** now serves as the canonical crosswalk reference.

---

## 📚 Documentation Framework

Version 1.0.0 includes a full documentation site built using Docusaurus:

### **Included Sections**
- **Getting Started** (installation, ingestion guidelines, examples)  
- **Specification** (schema overview, modules, crosswalk, field definitions)  
- **Governance** (mission, overview, roadmap, FAQ, contribution process, versioning policy)  
- **Project Index** and **Changelog**  

### **Developer-Friendly Enhancements**
- MDX React components  
- Embedded crosswalk viewer  
- Logical sidebar hierarchy  
- Clear versioning metadata  

---

## 🔧 Tooling & Infrastructure

- Integration of a structured **GitHub repository layout** for schema and documentation  
- Foundation for future:
  - CI validation of schema updates  
  - Automated build & publishing  
  - Example normalization pipelines  

---

## 🧭 What’s Next (v1.1.0 Preview)

Planned enhancements include:

- New carriers in the crosswalk (Kaiser, Molina, Oscar, Ambetter)  
- Pharmacy benefit module (preliminary)  
- Formal plan “Variants” support (SBC variations under one parent ID)  
- Machine-executable ingestion rules (YAML-based rule system)  
- Example benefit-plan JSON library  
- API specification for parsing & normalization services  

---

# Summary

The **v1.0.0 release** establishes the Benefit Plan Standard as a credible, extensible, and production-ready framework for benefit-plan normalization.  
This foundation enables:

- predictable ingestion pipelines  
- unified data structures  
- improved interoperability across carriers  
- future schema and module expansions  

The work delivered here forms the core of all future releases.

