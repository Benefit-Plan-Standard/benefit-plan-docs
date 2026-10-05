---
id: examples
title: Example JSON Plans
sidebar_label: Examples
---

# Example JSON Plans

Below are real-world example benefit plans structured using the **Benefit Plan Standard**. 10 were read from a published plan document and verified value by value against it; the source PDFs ship alongside the examples in `examples/sources/`. 3 more were imported from the CMS Marketplace public use files.

These examples help developers, carriers, and vendors understand how to implement the schema correctly.

👉 **View the complete example library on GitHub:**  
https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples

## Included Examples

### From published plan documents

| File | Plan | Market | Plan type | Year | Schema | Benefits | Source document |
|---|---|---|---|---|---|---|---|
| `aetna_example.json` | Aetna FL PPO 1500 80/50 | Large group | PPO | 2026 | v1.1.0 | 27 | SBC |
| `aetna_ppo5000_example.json` | Aetna FL PPO 5000 80/50 | Large group | PPO | 2026 | v1.1.0 | 27 | SBC |
| `ambetter_example.json` | Ambetter Silver 94 HMO (Health Net of CA) | Individual | HMO | 2026 | v1.1.0 | 30 | SBC |
| `bluecross_example.json` | Florida Blue BlueOptions 505 | Individual | PPO | 2023 | v1.1.0 | 31 | SBC |
| `cigna_example.json` | Cigna Open Access Plus, Bowdoin College | Large group | OAP | 2026 | v1.1.0 | 30 | SBC |
| `gatorcare_example.json` | GatorCare Prime EPO (self-funded, administered by Florida Blue) | Self-funded | EPO | 2026 | v1.1.0 | 29 | SBC |
| `kaiser_example.json` | Kaiser Permanente Gold 80 HMO | Individual | HMO | 2026 | v1.1.0 | 31 | SBC |
| `united_example.json` | UnitedHealthcare Choice Plus HSA Gold 1700-4 | Small group | POS | 2026 | v1.1.0 | 29 | SBC |
| `humana_example.json` | Humana Gold Plus H1036-025 (HMO) | Medicare Advantage | HMO | 2026 | v1.2.0 draft | 72 | CMS Summary of Benefits |
| `scan_example.json` | SCAN Classic (HMO), Los Angeles County | Medicare Advantage | HMO | 2026 | v1.2.0 draft | 71 | CMS Summary of Benefits |

"Benefits" is the number of entries in `benefits[]`.

- **The 8 SBC examples** are generated from the source Summary of Benefits and Coverage and verified value by value against it. On October 5, 2026 the 8 were corrected against their PDFs for limits and deductible flags. Where a cell says nothing about the deductible, the flag follows the issuer's annotation convention (`false` where the chart marks the cells where the deductible applies, as GatorCare and Florida Blue do; `true` where it marks only "Deductible does not apply", as Aetna and Cigna do) and otherwise the SBC template footnote and the page 1 "services covered before you meet your deductible" answer (United). Ambetter and Kaiser have no deductible. They validate against v1.1.0 and, unchanged, against the v1.2.0 draft.
- **The 2 Medicare Advantage examples** are keyed by hand from the CMS Summary of Benefits and verified value by value against the cited pages. They use fields added in the v1.2.0 draft, so they validate against that draft only.

### From the CMS Marketplace public use files

| File | Plan | State | Market | Metal level | Plan year | Schema | Benefits placed |
|---|---|---|---|---|---|---|---|
| `blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.puf.json` | Blue Cross and Blue Shield of Louisiana, Blue Max Copay (PCP) 50/50 $3300 | LA | Individual | Silver | 2026 | v1.1.0 | 44 of 75 |
| `florida-blue-blueoptions-gold-1505.puf.json` | Florida Blue, BlueOptions Gold 1505 | FL | Individual | Gold | 2023 | v1.1.0 | 44 of 75 |
| `unitedhealthcare-uhc-gold-standard.puf.json` | UnitedHealthcare, UHC Gold Standard | TX | Individual | Gold | 2026 | v1.1.0 | 44 of 68 |

These 3 are produced by the importer, `scripts/from-marketplace-puf.js`, from 2 CMS files for the plan year: the Plan Attributes PUF and the Benefits and Cost Sharing PUF. No PDF is read, and the same files always give the same output. "Benefits placed" counts the plan's public-file rows that map to a canonical benefit key; the rest are listed by name in `source_references[]`. Florida Blue Gold 1505 has a second in-network tier (`IN2`). How the importer works, and what the public files cannot carry, is on [CMS Marketplace public files](./marketplace-public-files.md).

### FHIR Bundles

- **The 10 document-derived examples** are converted to FHIR R4 Bundles in [`examples/fhir/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/fhir) and published on this site. See [FHIR InsurancePlan](./fhir-insuranceplan.md).
- **The 3 public-file examples** are converted by the same converter into [`examples/fhir-puf/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/fhir-puf). They show the chain from the public files to FHIR and are not published on this site.

Home health care and chiropractic care are in the BPS files but outside the 29 benefit category codes of the CARIN SBC InsurancePlan profile, so the Bundles list them by name only, without their limits and conditions.

### Condition types

Row text that is not a cost share or a structured limit goes in `benefits[].conditions[]`, verbatim. The 8 SBC examples use 7 types:

| Type | Use it for |
|---|---|
| `benefit_limit` | Limit wording kept verbatim: a limit with no benefit row of its own, or a limit whose wording `limits[]` cannot carry in full |
| `exception` | An exception printed inside a cost cell (for example where the deductible does not apply) |
| `site_of_service` | A cost cell that prices settings differently (for example Ambulatory Surgical Center against Hospital) |
| `dispensing_limit` | Drug day-supply wording, 1 condition per channel where retail and mail order differ |
| `cost_share_cap` | A maximum copay or coinsurance amount |
| `penalty` | A penalty for missing precertification |
| `authorization` | A precertification or preauthorization requirement or threshold |

The public-file examples use `exclusion` and `explanation`, 1 per free-text column of the Benefits and Cost Sharing PUF. The Medicare Advantage examples use their own types (for example `authorization`, `network`, `eligibility`).

The full notes, including source references and the things to know about each plan, are in [`examples/README.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/README.md).
