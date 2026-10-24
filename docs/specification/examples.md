---
id: examples
title: Example JSON Plans
sidebar_label: Examples
---

# Example JSON Plans

Below are real-world example benefit plans structured using the **Benefit Plan Standard**. 10 were read from a published plan document and verified value by value against it; the source PDFs ship alongside the examples in `examples/sources/`. 5 more were imported from the CMS Marketplace public use files, and 7 from the CMS Plan Benefit Package (PBP) files: 5 Medicare Advantage plans and, since October 24, 2026, 2 stand-alone Medicare Part D plans.

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
- **The 2 Medicare Advantage examples** are read from the CMS Summary of Benefits and verified value by value against the cited pages. They use fields added in the v1.2.0 draft, so they validate against that draft only.

### From the CMS Marketplace public use files

| File | Plan | State | Market | Metal level | Plan year | Schema | Benefits placed |
|---|---|---|---|---|---|---|---|
| `avmed-avmed-entrust-gold-125.puf.json` | AvMed, AvMed Entrust Gold 125 (2026) | FL | Individual | Gold | 2026 | v1.2.0 draft | 52 of 73 |
| `blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.puf.json` | Blue Cross and Blue Shield of Louisiana, Blue Max Copay (PCP) 50/50 $3300 | LA | Individual | Silver | 2026 | v1.2.0 draft | 52 of 75 |
| `florida-blue-blueoptions-gold-1505.puf.json` | Florida Blue, BlueOptions Gold 1505 | FL | Individual | Gold | 2023 | v1.2.0 draft | 52 of 75 |
| `unitedhealthcare-uhc-bronze-essential.puf.json` | UnitedHealthcare, UHC Bronze Essential ($0 Virtual Urgent Care) | FL | Individual | Bronze | 2026 | v1.2.0 draft | 52 of 68 |
| `unitedhealthcare-uhc-gold-standard.puf.json` | UnitedHealthcare, UHC Gold Standard | TX | Individual | Gold | 2026 | v1.2.0 draft | 52 of 68 |

These 5 are produced by the Marketplace importer, `scripts/from-marketplace-puf.js`, from 3 CMS files for the plan year: the Plan Attributes PUF, the Benefits and Cost Sharing PUF and, since October 20, 2026, the Network PUF, which gives the provider directory link. Since that day the Marketplace importer writes Benefit Plan Standard schema 1.2.0 documents (it wrote 1.1.0 before), with the plan's HIOS identifiers in `plan_identifiers`. No PDF is read, and the same files always give the same output. "Benefits placed" counts the plan's public-file rows that map to a canonical benefit key; the rest are listed by name in `source_references[]`. AvMed Entrust Gold 125 and Florida Blue Gold 1505 have a second in-network tier (`IN2`). How the Marketplace importer works, and what the public files cannot carry, is on [CMS Marketplace public files](./marketplace-public-files.md).

### From the CMS Medicare Advantage PBP files

| File | Plan | State | Market | Plan type | Contract year | Schema | Benefits placed |
|---|---|---|---|---|---|---|---|
| `unitedhealthcare-aarp-medicare-advantage-from-uhc-fl-0021.pbp.json` | UnitedHealthcare, AARP Medicare Advantage from UHC FL-0021 (PPO), H2406-013-000 | FL | Medicare Advantage | PPO | 2027 | v1.2.0 draft | 38 of 41 |
| `humana-humana-gold-plus-h1036-068.pbp.json` | Humana, Humana Gold Plus H1036-068 (HMO), H1036-068-000 | FL | Medicare Advantage | HMO | 2027 | v1.2.0 draft | 38 of 41 |
| `aetna-medicare-aetna-medicare-select-extra.pbp.json` | Aetna Medicare, Aetna Medicare Select Extra (HMO-POS), H1609-028-000 | FL | Medicare Advantage | HMO-POS | 2027 | v1.2.0 draft | 38 of 41 |
| `upmc-for-life-upmc-for-life-ppo-rx-choice.pbp.json` | UPMC for Life, UPMC for Life PPO Rx Choice (PPO), H5533-019-000 | PA | Medicare Advantage | PPO | 2027 | v1.2.0 draft | 38 of 41 |
| `scan-health-plan-scan-costco-medicare-advantage.pbp.json` | SCAN Health Plan, SCAN Costco Medicare Advantage (HMO), H5425-140-000 | CA | Medicare Advantage | HMO | 2027 | v1.2.0 draft | 38 of 41 |
| `unitedhealthcare-aarp-medicare-rx-preferred-from-uhc.pbp.json` | UnitedHealthcare, AARP Medicare Rx Preferred from UHC (PDP), S5921-383-000 | FL | Medicare Part D | PDP | 2027 | v1.2.0 draft | Part D only |
| `wellcare-wellcare-value-script.pbp.json` | Wellcare, Wellcare Value Script (PDP), S4802-146-000 | FL | Medicare Part D | PDP | 2027 | v1.2.0 draft | Part D only |

These 7 are produced by the Medicare Advantage importer, `scripts/from-pbp.js`, from the CMS PBP Benefits files for contract year 2027. No PDF is read, and the same files always give the same output. "Benefits placed" counts the entries in `benefits[]` out of the 41 service categories in the Medicare Advantage importer's crosswalk, preventive services (category 14a) among them since October 20, 2026; the other 3 are the hearing aid rows for a single aid type, written only when a plan chooses that type. Since October 24, 2026 each of the 5 Medicare Advantage examples also carries its Part D benefit (33 to 67 Part D benefits after the 38 medical ones), and the 2 Part D plans carry only theirs (41 and 70). Two of the 5, UnitedHealthcare H2406-013 and Aetna H1609-028, were checked against the carrier's 2027 Summary of Benefits: 0 differences on UnitedHealthcare, and on Aetna 0 on cost shares and 2 on web addresses, where the Summary of Benefits and the PBP file give different addresses. On Part D, Humana H1036-068 and the UnitedHealthcare Part D plan S5921-383 were checked the same way, with 0 differences. How the Medicare Advantage importer works, and what the PBP files cannot carry, is on [CMS Medicare Advantage PBP files](./medicare-advantage-pbp.md).

### Validating the examples

All 22 examples validate against the Benefit Plan Standard schema 1.2.0 draft. From the Benefit Plan Standard schema repository,

```bash
node scripts/validate.js --schema schema/v1.2.0/benefit-plan.schema.json examples/*.json
```

prints 22 PASS. Without `--schema`, `scripts/validate.js` checks against Benefit Plan Standard schema 1.1.0, the latest final release, which the 8 SBC examples declare. The other 14 (the 2 read from the Summary of Benefits and the 12 written by the Marketplace importer and the Medicare Advantage importer) declare 1.2.0 and validate against the draft only.

### FHIR Bundles

The route from the CMS files through the importers and the converter, with every command, is on [How the data flows](./data-flow.md).

- **The 10 document-derived examples** are converted to FHIR R4 Bundles in [`examples/fhir/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/fhir) and published on this site. See [FHIR InsurancePlan](./fhir-insuranceplan.md).
- **The 5 public-file examples** are converted by the same converter into [`examples/fhir-puf/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/fhir-puf). They show the chain from the public files to FHIR and are not published on this site.
- **The 5 Medicare Advantage PBP examples** are converted by the same converter into [`examples/fhir/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/fhir), beside the 10 document-derived Bundles, and are published on this site with them.

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

The Marketplace public-file examples use `exclusion` and `explanation`, 1 per free-text column of the Benefits and Cost Sharing PUF. The 2 Medicare Advantage examples read from the Summary of Benefits use their own types (for example `authorization`, `network`, `eligibility`). The 5 PBP examples use `authorization` and `referral`, written where the file answers Yes.

The full notes, including source references and the things to know about each plan, are in [`examples/README.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/README.md).
