---
id: examples
title: Examples
sidebar_position: 2
---

# Examples

This page showcases example normalized plan files and explains how to interpret them.  Every example is a real plan. 8 are read from the Summary of Benefits and Coverage the carrier published and verified value by value against it; 2 Medicare Advantage plans are read from the CMS Summary of Benefits; 5 are imported from the CMS Marketplace public use files and 5 Medicare Advantage plans from the CMS Plan Benefit Package (PBP) files, with no PDF involved. All 20 live in the [`examples/` directory of the schema repository](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples), and the 10 read from a document have their source PDFs in [`examples/sources/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/sources):

| File | Plan | Type | Market |
|---|---|---|---|
| `aetna_example.json` | Aetna FL PPO 1500 80/50 | PPO | Large group |
| `aetna_ppo5000_example.json` | Aetna FL PPO 5000 80/50 | PPO | Large group |
| `ambetter_example.json` | Health Net of CA Silver 94 Ambetter | HMO | Individual |
| `bluecross_example.json` | Florida Blue BlueOptions 505 | PPO | Individual |
| `cigna_example.json` | Bowdoin College Open Access Plus | OAP | Large group |
| `gatorcare_example.json` | Florida Blue BlueOptions 03768 Prime | EPO | Not stated |
| `kaiser_example.json` | Kaiser Permanente Gold 80 | HMO | Individual |
| `united_example.json` | UHC Choice Plus HSA Gold 1700-4 | POS | Small group |
| `humana_example.json` | Humana Gold Plus H1036-025 | HMO | Medicare Advantage |
| `scan_example.json` | SCAN Classic, Los Angeles County | HMO | Medicare Advantage |
| `avmed-avmed-entrust-gold-125.puf.json` | AvMed Entrust Gold 125, from the public files | HMO | Individual |
| `blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.puf.json` | Blue Cross and Blue Shield of Louisiana Blue Max Copay 50/50, from the public files | PPO | Individual |
| `florida-blue-blueoptions-gold-1505.puf.json` | Florida Blue BlueOptions Gold 1505, from the public files | EPO | Individual |
| `unitedhealthcare-uhc-bronze-essential.puf.json` | UnitedHealthcare UHC Bronze Essential, from the public files | HMO | Individual |
| `unitedhealthcare-uhc-gold-standard.puf.json` | UnitedHealthcare UHC Gold Standard, from the public files | HMO | Individual |
| `unitedhealthcare-aarp-medicare-advantage-from-uhc-fl-0021.pbp.json` | AARP Medicare Advantage from UHC FL-0021, from the PBP files | PPO | Medicare Advantage |
| `humana-humana-gold-plus-h1036-068.pbp.json` | Humana Gold Plus H1036-068, from the PBP files | HMO | Medicare Advantage |
| `aetna-medicare-aetna-medicare-select-extra.pbp.json` | Aetna Medicare Select Extra, from the PBP files | HMO-POS | Medicare Advantage |
| `upmc-for-life-upmc-for-life-ppo-rx-choice.pbp.json` | UPMC for Life PPO Rx Choice, from the PBP files | PPO | Medicare Advantage |
| `scan-health-plan-scan-costco-medicare-advantage.pbp.json` | SCAN Costco Medicare Advantage, from the PBP files | HMO | Medicare Advantage |

The full table, with plan years, schema versions and benefit counts, is on the [Examples](/docs/specification/examples) page under Specification; the public-file examples are explained on [CMS Marketplace public files](/docs/specification/marketplace-public-files) and [CMS Medicare Advantage PBP files](/docs/specification/medicare-advantage-pbp).

The first 8 are commercial and marketplace plans built from the SBC. The 7 Medicare Advantage plans come from other CMS documents: 2 from the Summary of Benefits and 5 from the PBP files. Medicaid is not part of this set yet.

All 22 examples in `examples/`, these 15, the 5 Marketplace examples and the 2 stand-alone Part D plans, validate against the Benefit Plan Standard schema 1.2.0: from the Benefit Plan Standard schema repository, `node scripts/validate.js examples/*.json` prints 22 PASS, since `scripts/validate.js` checks against 1.2.0, the latest release, when no `--schema` is given. 7 of the 8 SBC examples declare 1.1.0 and validate against it too; the importers write 1.2.0 documents.

## Example: Blue Cross PPO

[`examples/bluecross_example.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/bluecross_example.json) is a good first read.  It shows how deductibles, copays, coinsurance and network tiers fit together in one JSON object.

- Two tiers, `IN` and `OUT`, each with its own cost shares
- Separate in-network and out-of-network deductibles and out-of-pocket maximums, at both the individual and family level
- 31 benefit entries, each carrying a source reference back to the page of the SBC it came from

## Example: Kaiser Permanente HMO

[`examples/kaiser_example.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/kaiser_example.json) shows a closed-network plan.

- One tier, `IN`, and no out-of-network accumulators, because the plan has no out-of-network benefit
- The same benefit categories as the PPO examples, so the two can be compared field for field

## Example: GatorCare EPO

[`examples/gatorcare_example.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/gatorcare_example.json) is a plan read from 2 documents, a medical SBC and a pharmacy SBC.

- No `market`, because neither SBC states it
- `IN` and `OUT` tiers with a single set of plan-wide accumulators
- A `pharmacy` object with its own deductible, `amount` 125 and `family_amount` 500, and 6 formulary tiers
- A coinsurance with a dollar floor and a cap: Tier 1 is 25%, with `min_amount` 10 and `max_amount` 20
- `covered_under` on a not-covered row, which says where the document points: the medical SBC's drug rows point to `pharmacy`, and insulin pumps on the pharmacy side point to `medical`
- `document` on every citation, which names the PDF it is in

## How to Explore Examples

To inspect any example plan:

1. Clone the schema repository: `git clone https://github.com/Benefit-Plan-Standard/benefit-plan-schema`, or browse the [`examples/` directory](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples) directly on GitHub.
2. Open one of the JSON files in the `examples/` directory.
3. Compare the fields to the [Field Definitions](/docs/specification/field-definitions) to understand their meaning.
4. Validate the JSON using a schema validator (see [Installation & Usage](/docs/getting-started/installation)).

As more carriers and lines of business are normalized, new examples will be added.
