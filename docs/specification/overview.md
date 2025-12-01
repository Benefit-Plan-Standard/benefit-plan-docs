---
id: overview
title: Specification Overview
sidebar_position: 1
---

# Overview

The **Benefit Plan Standard** defines a canonical JSON data model for representing health benefit plan designs across carriers.  It provides a single unified structure for cost‑sharing information, network tiers, accumulators, service definitions, visit limits, and other plan metadata.  The goal is to simplify the exchange of benefit data, enable accurate plan comparison, and power new analytics and applications.

This overview introduces the major concepts in the specification and links to detailed sections.

## Why a New Standard?

Benefit plans today are published in human‑readable PDFs and spreadsheets.  Carriers describe deductibles, copays, and out‑of‑pocket maximums in inconsistent formats, making automated processing nearly impossible.  Brokers, employers and insurtechs must invest in bespoke data pipelines for each carrier.

The Benefit Plan Standard solves this by defining:

- **A core JSON schema** describing plan metadata, network tiers, accumulators, benefit rows and cost shares.
- **A field definition matrix** that maps carrier vocabulary to standardized fields.
- **Validation rules** for structural and semantic integrity.
- **Extensible modules** to incorporate pharmacy, dental, vision and other lines of business.

## High‑Level Model

At the highest level, a normalized plan is represented as a single JSON object with the following top‑level keys:

| Field               | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `plan_id`           | Unique identifier for the plan, often a combination of carrier and year |
| `carrier`           | Name of the issuing carrier                                          |
| `product_type`      | Insurance product type (e.g., PPO, HMO, Medicare Advantage)          |
| `effective_date`    | Date the plan becomes effective                                      |
| `network_tiers`     | List of network tiers (e.g., in‑network, out‑of‑network)             |
| `accumulators`      | Deductibles and out‑of‑pocket maximums, individual and family        |
| `benefits`          | Array of benefit items describing cost sharing per service           |
| `source_refs`       | References back to the original document for auditing               |

You can see the full JSON schema definition in the [benefit‑plan‑schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema).

## Next Steps

* [Field Definitions](field-definitions) — A detailed description of every field in the schema.
* [Crosswalk](crosswalk) — How carrier terms map into normalized fields.
* [Modules](modules) — Extensions for pharmacy, behavioral health and other lines of business.
