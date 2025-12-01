---
id: field-definitions
title: Field Definitions
sidebar_position: 3
---

# Field Definitions

This page provides detailed descriptions of the fields defined by the Benefit Plan Standard.  Each field appears in the core JSON schema and has a specific purpose.  Refer to the [overview](overview.md) for a high‑level introduction to the schema.

## Plan Metadata

| Field               | Type       | Required | Description                                                       |
|---------------------|-----------|----------|-------------------------------------------------------------------|
| `plan_id`           | string    | Yes      | Unique ID for the plan, recommended format `<carrier>-<id>-<year>` |
| `carrier`           | string    | Yes      | Name of the issuing carrier                                       |
| `product_type`      | string    | Yes      | Plan type (e.g., `PPO`, `HMO`, `Medicare Advantage`)               |
| `effective_date`    | string    | Yes      | ISO‑8601 date the plan becomes effective                           |
| `market`            | string    | No       | Market segment (e.g., `Commercial`, `Medicare`)                    |
| `plan_name`         | string    | Yes      | Carrier‑assigned marketing name of the plan                        |

## Network Tiers

Each normalized plan includes a `network_tiers` array.  A network tier defines a level of provider participation.  Common tiers are `IN` (in‑network) and `OUT` (out‑of‑network), but carriers may define additional tiers (e.g., Tier 1/Tier 2 for narrow networks).  A tier object contains:

| Field        | Type    | Required | Description                                          |
|--------------|--------|----------|------------------------------------------------------|
| `tier_id`    | string | Yes      | Short identifier (e.g., `IN`, `OUT`, `T1`, `T2`)      |
| `name`       | string | Yes      | Human‑friendly name of the tier                      |
| `description`| string | No       | Additional description or notes for the tier         |

## Accumulators

Accumulators describe plan‑wide financial thresholds, such as deductibles and out‑of‑pocket maximums.  The core schema defines four fields:

| Field                         | Type     | Description                                                                  |
|-------------------------------|----------|------------------------------------------------------------------------------|
| `individual_deductible.amount`| number   | Dollar amount each member must pay before cost sharing begins                |
| `family_deductible.amount`    | number   | Dollar amount the family must pay (aggregate) before cost sharing begins      |
| `individual_oop.amount`       | number   | Out‑of‑pocket maximum for the individual                                     |
| `family_oop.amount`           | number   | Out‑of‑pocket maximum for the family (aggregate)                              |

In future versions, the Accumulator Groups module will allow multiple deductibles (e.g., pharmacy vs. medical) and tier‑specific accumulators.

## Benefits

The `benefits` array is the heart of the schema.  Each benefit item describes cost sharing for a specific service category.  A benefit item has the following structure:

| Field                   | Type     | Required | Description                                                                                                  |
|-------------------------|----------|----------|--------------------------------------------------------------------------------------------------------------|
| `benefit_id`            | string   | Yes      | Unique ID for the benefit item within the plan                                                              |
| `category`              | string   | Yes      | High‑level service category (e.g., `PHYSICIAN_SERVICES`, `PREVENTIVE_CARE`, `EMERGENCY_SERVICES`)            |
| `service_name`          | string   | Yes      | Human‑readable description of the service (e.g., `Primary care visit`)                                       |
| `place_of_service`      | string[] | No       | List of places where the service is provided (e.g., `office`, `hospital`, `telehealth`)                      |
| `network_cost_shares`   | object[] | Yes      | Array of cost share objects, one per tier (see below)                                                        |
| `limits`                | object[] | No       | Visit, day or dollar limits (e.g., 10 visits per year)                                                       |
| `conditions`            | object[] | No       | Qualifiers such as prior authorization, referral requirement, or eligibility criteria                        |
| `source_refs`           | object[] | Yes      | List of references back to the original document, including page and excerpt                                 |

### Network Cost Shares

Each item in `network_cost_shares` describes how members pay for the service in a specific network tier.  It includes up to three cost share components:

| Field                         | Type     | Required | Description                                                                        |
|-------------------------------|----------|----------|------------------------------------------------------------------------------------|
| `tier_id`                     | string   | Yes      | Identifier of the network tier                                                     |
| `covered`                     | boolean  | Yes      | Whether the service is covered in this tier                                        |
| `deductible`                  | object   | No       | Information about deductible applicability (see schema for details)                 |
| `copay`                       | object   | No       | Copay amount and units (e.g., `$25 per visit`)                                     |
| `coinsurance`                 | object   | No       | Coinsurance percentage (e.g., `20%`), may include notes about after deductible      |
| `notes`                       | string   | No       | Free‑form notes or qualifiers                                                      |

Future modules will expand the cost share model to capture pharmacy day‑supply variation and per‑tier deductibles.

### Limits

A `limit` object contains:

| Field       | Type   | Required | Description                                                                       |
|-------------|-------|----------|-----------------------------------------------------------------------------------|
| `type`      | string| Yes      | Limit type (e.g., `VISITS`, `DAYS`, `DOLLARS`)                                     |
| `value`     | number| Yes      | Numeric value of the limit (e.g., `20`)                                            |
| `period`    | string| No       | Period over which the limit applies (e.g., `PER_YEAR`, `PER_EPISODE`, `LIFETIME`)   |
| `applies_to`| string| No       | Category or service code that the limit applies to (if applicable)                 |

### Conditions

Conditions capture qualifiers such as prior authorization, referral requirements, or clinical criteria.  A condition contains a `type` and optional `code` and `description`.  For example:

```
{
  "type": "authorization",
  "code": "PRIOR_AUTH",
  "description": "Prior authorization required from the plan"
}
```

## Source References

Each benefit item includes `source_refs`—a list of objects containing the page number and excerpt text from the original plan document.  These references provide traceability and support auditing.  A typical source reference looks like:

```
{
  "document": "BlueOptions 505 SBC",
  "page": 3,
  "excerpt": "Primary care visit to treat an injury or illness: $35 copay per visit. Deductible does not apply."
}
```

## Deprecated and Reserved Fields

The core schema reserves several fields for future expansions.  For example, `pharmacy_deductible` is not currently required but may become mandatory when the Pharmacy module is integrated.  See the [modules overview](modules) for details.
