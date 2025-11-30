---
id: crosswalk
title: Carrier Crosswalk
sidebar_position: 3
---

# Carrier Crosswalk

The Benefit Plan Standard includes a **crosswalk** that maps each carrier’s terminology and structure into the normalized schema fields.  This ensures that, for example, a “facility fee” copay from Carrier A and a “hospital copay” from Carrier B end up in the same normalized field.

This page summarizes the crosswalk and links to the detailed tables.

## Purpose

Carriers describe benefits in different ways.  Terms like “copay,” “office visit charge,” “coinsurance,” “deductible with 20% share,” or “per admission deductible” vary widely.  Without a crosswalk, ingestion would require custom logic for every carrier.

The crosswalk solves this by specifying, for each normalized field:

- The corresponding column or phrase used by each carrier
- Notes on how to parse the carrier’s representation (e.g., combined copay and coinsurance expressions)
- Exceptions and edge cases

## Crosswalk Tables

The full crosswalk tables are provided in the `field-crosswalk.xlsx` file within this repository.  Each sheet corresponds to a normalized field and contains columns for each carrier.  For example:

| Normalized Field        | Blue Cross | GatorCare | SCAN | Aetna | United | Cigna | Humana |
|-------------------------|-----------|-----------|------|-------|--------|-------|--------|
| `benefits.category`     | “Common Medical Event” | “Hospital Services” | “Services that are covered for you” | ... | ... | ... | ... |
| `network_cost_shares`   | “In‑network Provider / Out‑of‑network Provider” | “Tier 1 / Tier 2 / OON” | “In network cost share / Out of network cost share” | ... | ... | ... | ... |
| `limits`                | “Limitations and important notes” | “Notes” | “How often is it covered?” | ... | ... | ... | ... |

Due to size, the full crosswalk is not reproduced here.  You can download the Excel file from the repository root or view it in the [F.2 Carrier Crosswalk Tables](/docs/specification/crosswalk) section.

## Using the Crosswalk

When integrating a new carrier, refer to the crosswalk to identify how to map each benefit field.  For example:

- **Copay**: Blue Cross uses a dollar amount with “per visit,” while SCAN lists a dollar amount followed by “coinsurance does not apply.”  The crosswalk clarifies which part goes to `network_cost_shares.copay` and which goes into a condition.
- **Deductible**: GatorCare has separate deductibles for pharmacy and medical; Aetna’s SBC merges pharmacy into medical.  The crosswalk highlights these differences and specifies how to populate `individual_deductible` and `family_deductible`.

If a carrier uses a new or ambiguous term, update the crosswalk and add an entry describing how to map it.  Consistent maintenance of the crosswalk keeps the ingestion pipeline accurate.
