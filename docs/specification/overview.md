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
| `plan_name`         | Carrier-assigned marketing name of the plan                          |
| `carrier`           | Name of the issuing carrier                                          |
| `plan_type`         | Insurance plan type (e.g., PPO, HMO, EPO, POS, HDHP, Medicare Advantage) |
| `plan_year`         | Coverage year (e.g., 2025) — added in v1.1.0                         |
| `effective_date`    | Date the plan becomes effective (ISO 8601)                           |
| `expiry_date`       | Date the plan expires or renews (ISO 8601)                           |
| `coverage_period`   | Explicit `{ start_date, end_date }` for the coverage window — added in v1.1.0 |
| `market`            | Market segment (e.g., individual, small_group, medicare_advantage)   |
| `network_tiers`     | List of network tiers (e.g., in-network, out-of-network)             |
| `accumulators`      | Deductibles and out-of-pocket maximums, individual and family, in- and out-of-network |
| `benefits`          | Array of benefit items describing cost sharing per service           |
| `source_references` | References back to the original document for auditing               |
| `schema_version`    | Version of the standard used to validate the document (e.g., `1.1.0`) |

You can see the full JSON schema definition in the [benefit‑plan‑schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema).

## Next Steps

* [Field Definitions](field-definitions) — A detailed description of every field in the schema.
* [Crosswalk](crosswalk) — How carrier terms map into normalized fields.
* [Modules](modules) — Extensions for pharmacy, behavioral health and other lines of business.
