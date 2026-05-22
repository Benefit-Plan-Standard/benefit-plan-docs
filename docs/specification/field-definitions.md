---
id: field-definitions
title: Field Definitions
sidebar_position: 3
---

# Field Definitions

This page describes every field defined by the **Benefit Plan Standard v1.1.0** JSON schema. Refer to the [overview](overview.md) for a high-level introduction.

**Canonical schema:** [`schema/v1.1.0/benefit-plan.schema.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/schema/v1.1.0/benefit-plan.schema.json)

Fields marked **v1.1.0** were added in the 2026-05-21 minor release. All v1.1.0 additions are backward-compatible — v1.0.0 documents continue to validate unchanged.

## Plan Metadata

| Field               | Type    | Required | Description                                                       |
|---------------------|---------|----------|-------------------------------------------------------------------|
| `plan_id`           | string  | Yes      | Unique ID for the plan, recommended format `<carrier>-<id>-<year>` |
| `plan_name`         | string  | Yes      | Carrier-assigned marketing name of the plan                       |
| `carrier`           | string  | Yes      | Name of the issuing carrier                                       |
| `plan_type`         | string  | No       | Plan design (`PPO`, `HMO`, `EPO`, `POS`, `HDHP`, `MA-PD`, etc.). See [plan-types vocabulary](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/plan-types.json). |
| `plan_year`         | integer | No       | **v1.1.0** Coverage year (e.g., `2025`). Useful when `effective_date` is absent or for grouping plans across years. |
| `effective_date`    | string (date) | No  | ISO 8601 date the plan becomes effective                          |
| `expiry_date`       | string (date) | No  | ISO 8601 date the plan expires or renews                          |
| `coverage_period`   | object  | No       | **v1.1.0** `{ start_date, end_date }` — explicit coverage window when it differs from `effective_date` / `expiry_date`. |
| `market`            | string  | No       | Market segment (`individual`, `individual_on_exchange`, `small_group`, `large_group`, `medicare_advantage`, `medicaid`, ...). See [markets vocabulary](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/markets.json). |
| `schema_version`    | string  | No       | Version of the standard the document conforms to (e.g., `1.1.0`)  |

## Network Tiers

`network_tiers` is a **required** array. Each entry defines a level of provider participation. Common tiers are `IN` (in-network) and `OUT` (out-of-network), but carriers may define additional tiers (`T1`, `T2`, `OON_EMERG`, etc.).

| Field        | Type   | Required | Description                                          |
|--------------|--------|----------|------------------------------------------------------|
| `tier_id`    | string | Yes      | Short identifier (e.g., `IN`, `OUT`, `T1`, `T2`)     |
| `name`       | string | Yes      | Human-friendly name of the tier                      |
| `description`| string | No       | Additional description or notes                      |

## Accumulators

`accumulators` is an **optional** object holding plan-wide financial thresholds. v1.0.0 defined the four legacy slots, which are implicitly **in-network**. v1.1.0 adds four explicit **out-of-network** counterparts plus richer per-accumulator metadata.

### Accumulator slots

| Slot                          | Network scope        | Notes                          |
|-------------------------------|----------------------|--------------------------------|
| `individual_deductible`       | in-network (implicit)|                                |
| `family_deductible`           | in-network (implicit)|                                |
| `individual_oop_max`          | in-network (implicit)|                                |
| `family_oop_max`              | in-network (implicit)|                                |
| `oon_individual_deductible`   | out-of-network       | **v1.1.0** new                 |
| `oon_family_deductible`       | out-of-network       | **v1.1.0** new                 |
| `oon_individual_oop_max`      | out-of-network       | **v1.1.0** new                 |
| `oon_family_oop_max`          | out-of-network       | **v1.1.0** new                 |

### Accumulator object shape

Each accumulator slot is an object with these fields:

| Field          | Type    | Required | Description                                                                       |
|----------------|---------|----------|-----------------------------------------------------------------------------------|
| `amount`       | number  | Yes      | Dollar amount of the deductible or OOP maximum                                    |
| `currency`     | string  | No       | ISO 4217 currency code (default `USD`)                                            |
| `period`       | string  | No       | **v1.1.0** Accumulation period (`per_calendar_year`, `per_plan_year`)             |
| `network_tier` | string  | No       | **v1.1.0** Network scope (`in-network`, `out-of-network`, or a custom `tier_id`)  |
| `applies_to`   | string  | No       | Coverage line the accumulator applies to (`medical`, `pharmacy`, `integrated`). In v1.0.0 this was deductible-only; **v1.1.0** allows it on OOP max for parity. |
| `embedded`     | boolean | No       | **v1.1.0** For family-level slots: whether each member has an embedded individual sub-limit that contributes to the family max. |

## Benefits

The `benefits` array is the heart of the schema. Each entry describes cost sharing for a specific service.

| Field                 | Type     | Required | Description                                                                                                  |
|-----------------------|----------|----------|--------------------------------------------------------------------------------------------------------------|
| `benefit_id`          | string   | Yes      | Unique ID for the benefit item within the plan                                                              |
| `benefit_type`        | string   | No       | **v1.1.0** Discriminator: `medical` (default), `pharmacy`, `dental`, `vision`, `behavioral_health`, `maternity`, `pediatric`. Enables future modules without restructuring the schema. |
| `category`            | string   | Yes      | High-level service category (e.g., `PHYSICIAN_SERVICES`, `PREVENTIVE_CARE`, `EMERGENCY_CARE`). See [categories vocabulary](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/categories.json). |
| `service_name`        | string   | Yes      | Human-readable description (e.g., `Primary care visit`)                                                      |
| `canonical_key`       | string   | No       | **v1.1.0** Machine-readable canonical identifier (e.g., `primary_care`, `imaging_advanced`). See [canonical-benefits vocabulary](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/canonical-benefits.json). |
| `raw_label`           | string \| null | No | **v1.1.0** Verbatim label from the source document before normalization. Useful for traceability.            |
| `place_of_service`    | string[] | No       | Places where the service is provided (e.g., `office`, `hospital`, `telehealth`)                              |
| `network_cost_shares` | object[] | Yes      | One entry per network tier (see [Network Cost Shares](#network-cost-shares))                                 |
| `limits`              | object[] | No       | Visit, day, or dollar limits                                                                                 |
| `conditions`          | object[] | No       | Qualifiers such as prior authorization, referral requirement, or eligibility criteria                        |
| `moop_applicability`  | string \| null | No | Whether this benefit's cost sharing counts toward MOOP (`plan_default`, `include`, `exclude`)                |
| `coding_hints`        | object   | No       | Optional `cpt_ranges` and `revenue_codes` for coding-system mapping                                          |

### Network Cost Shares

Each entry in `benefits[].network_cost_shares` describes how members pay in a specific network tier.

| Field          | Type     | Required | Description                                                                |
|----------------|----------|----------|----------------------------------------------------------------------------|
| `tier_id`      | string   | Yes      | Identifier of the network tier (matches `network_tiers[].tier_id`)         |
| `covered`      | boolean  | Yes      | Whether the service is covered in this tier                                |
| `cost_shares`  | object[] | No       | Ordered sequence of cost-share components (see below). Omitted when `covered: false`. |
| `notes`        | string \| null | No | Free-form notes or qualifiers for this tier                                |

### Cost Shares

Each entry in `network_cost_shares[].cost_shares` describes one step in the cost-share calculation (copay, coinsurance, deductible). Steps are evaluated in `sequence` order.

| Field                   | Type    | Required | Description                                                                |
|-------------------------|---------|----------|----------------------------------------------------------------------------|
| `type`                  | string  | Yes      | `copay`, `coinsurance`, or `deductible`                                    |
| `sequence`              | integer | Yes      | Order in which this cost share is applied (starting at 1)                  |
| `amount`                | number \| null  | No | Dollar amount for copay or flat deductible                                 |
| `rate`                  | number \| null  | No | Percentage rate (0.0–1.0) for coinsurance                                  |
| `basis`                 | string \| null  | No | Calculation basis (`per_visit`, `per_day`, `per_test`, `per_prescription`, `allowed_amount`) |
| `applies_to_deductible` | boolean | No       | Whether this step applies before the deductible is met (default `false`)   |
| `applies_to_moop`       | boolean | No       | Whether this step counts toward the maximum out-of-pocket (default `true`) |
| `notes`                 | string \| null  | No | **v1.1.0** Free-text qualifier for this step (e.g., "copay waived after day 5") |

#### Example

A PPO benefit with in-network $25 copay and out-of-network 50% coinsurance after the deductible:

```json
{
  "network_cost_shares": [
    {
      "tier_id": "IN",
      "covered": true,
      "cost_shares": [
        { "type": "copay", "sequence": 1, "amount": 25, "basis": "per_visit",
          "applies_to_deductible": false, "applies_to_moop": true }
      ]
    },
    {
      "tier_id": "OUT",
      "covered": true,
      "cost_shares": [
        { "type": "deductible",  "sequence": 1, "rate": 1.0,  "basis": "allowed_amount",
          "applies_to_deductible": true, "applies_to_moop": true },
        { "type": "coinsurance", "sequence": 2, "rate": 0.50, "basis": "allowed_amount",
          "applies_to_deductible": true, "applies_to_moop": true }
      ]
    }
  ]
}
```

### Limits

A `limit` object contains:

| Field    | Type   | Required | Description                                                            |
|----------|--------|----------|------------------------------------------------------------------------|
| `type`   | string | Yes      | Limit type (`visits`, `days`, `dollars`)                               |
| `value`  | number | Yes      | Numeric value of the limit (e.g., `20`)                                |
| `period` | string \| null | No | Period over which the limit applies (`per_year`, `per_episode`, `per_lifetime`) |

### Conditions

Conditions capture qualifiers like prior authorization or referral requirements:

```json
{
  "type": "authorization",
  "code": "PRIOR_AUTH",
  "description": "Prior authorization required from the plan"
}
```

| Field         | Type   | Required | Description                                              |
|---------------|--------|----------|----------------------------------------------------------|
| `type`        | string | Yes      | `authorization`, `referral`, `clinical`, etc.            |
| `code`        | string \| null | No | Optional code identifying the condition                  |
| `description` | string | Yes      | Human-readable description                               |

## Source References

`source_references` is an **optional, top-level (plan-level)** array providing citations back to the source document for auditing.

| Field         | Type    | Description                                       |
|---------------|---------|---------------------------------------------------|
| `page_number` | integer | Page number in the source document                |
| `page_range`  | string  | Optional line/page range identifier               |
| `excerpt`     | string  | Verbatim excerpt from the source                  |

A typical entry:

```json
{
  "page_number": 3,
  "page_range": "L100-L150",
  "excerpt": "Primary care visit to treat an injury or illness: $35 copay per visit. Deductible does not apply."
}
```

:::note
v1.0.0 docs incorrectly described `source_refs` as a per-benefit, required field. The actual schema (v1.0.0 and v1.1.0) defines `source_references` at the **top level** and as **optional**. For per-field provenance, see the [FHIR alignment guide](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/fhir-alignment.md) and the canonical-benefits vocabulary.
:::

## Vocabularies

v1.1.0 publishes four non-normative recommended vocabularies. The schema leaves the corresponding fields as free-form strings so adopters can extend; the vocabularies provide consistent values for interoperability.

| Vocabulary | Used for | File |
|------------|----------|------|
| Canonical benefits | `benefits[].canonical_key` | [`vocabularies/canonical-benefits.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/canonical-benefits.json) |
| Categories | `benefits[].category` | [`vocabularies/categories.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/categories.json) |
| Markets | `market` | [`vocabularies/markets.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/markets.json) |
| Plan types | `plan_type` | [`vocabularies/plan-types.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/vocabularies/plan-types.json) |

## FHIR Alignment

The [FHIR alignment guide](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/fhir-alignment.md) provides a field-by-field crosswalk from BPS to FHIR R4 `InsurancePlan`, with a worked example and round-tripping guidance.

## Deprecated and Reserved Fields

The schema reserves several field names for future module expansions. For example, the `pharmacy_deductible` slot is not currently part of v1.1.0 but may be introduced when the Pharmacy module is integrated. See the [modules overview](modules) for details.
