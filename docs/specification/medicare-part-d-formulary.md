---
id: medicare-part-d-formulary
title: CMS Medicare Part D formulary files to the Benefit Plan Standard
sidebar_label: Medicare Part D formulary files
---

# CMS Medicare Part D formulary files to the Benefit Plan Standard

The schema repository includes an importer, `scripts/from-partd-formulary.js`, since November 11, 2026 (the Benefit Plan Standard schema 1.2.0 draft 9). It reads the CMS monthly public use file "Prescription Drug Plan Formulary and Pharmacy Network Information" and writes, for every Medicare Part D plan in it, the plan's drug list: which drugs are on it, on which tier, with which prior authorization, step therapy and quantity limit. It is the third importer, beside the [Marketplace importer](./marketplace-public-files.md) and the [Medicare Advantage importer](./medicare-advantage-pbp.md), and it builds on the second: a plan's document starts from the Medicare Advantage importer's document for the same plan.

Where this importer sits beside the others, with every command, is on [How the data flows](./data-flow.md#import-part-d-drug-lists).

## The CMS file

CMS posts the file every month as a zip named `YYYY_YYYYMMDD`: the first 4 digits are the contract year, the last 8 the date CMS posted it. Release `2027_20261008`, for contract year 2027, lists 286 formularies and 963,666 drug rows; Plan Information has 5,495 plans, and up to 660 plans share 1 list.

| File in the zip | Read | Why |
|---|---|---|
| Plan Information | yes | The join from a plan to its formulary. |
| Basic Drugs Formulary | yes | The list. |
| Excluded Drugs Formulary | yes | Drugs Part D excludes that a plan covers as a supplemental benefit. |
| Beneficiary Cost | yes | The tier check, the comparison with the Medicare Advantage importer's document, and the tiers of a Defined Standard plan. |
| Indication Based Coverage | yes | Drugs on a formulary for named indications only. |
| Insulin Beneficiary Cost | no | It belongs with the insulin benefits, which are still open. |
| Geographic Locator | no | The service area comes from the PBP files. |
| Pharmacy Networks | no | Pharmacy lists and dispensing fees are not plan design. |

The files are pipe-delimited text. The importer checks each header against its column list, name by name and in order, and stops with an error that quotes both when they differ. It reads files on disk and never fetches: the zip, unzipped into `data/partd-formulary/<release>/txt/` with a `download.json`, and the PBP files of the same contract year in `data/pbp/<year>/`.

## What the importer produces

2 kinds of document:

- **A formulary list** ([`/schema/v1.2.0/formulary.schema.json`](https://benefitplanstandard.org/schema/v1.2.0/formulary.schema.json)), 1 per formulary, written once for every plan that uses it. Each drug's tier, prior authorization, step therapy, quantity limit and negotiation flag quote its row.
- **A plan document** (`schema/v1.2.0/benefit-plan.schema.json`): the Medicare Advantage importer's document for the plan, with `pharmacy.formulary_reference`, which names the plan's list, and the plan's own items: the drugs Part D excludes that the plan covers, and drugs covered for named indications only.

Every drug's tier is a tier the Medicare Advantage importer writes for the plan, or, for a Defined Standard plan, for which the PBP files hold no tier rows, a tier of the file's Beneficiary Cost rows. The file's `PREMIUM` is the whole premium of a stand-alone drug plan, which no PBP file holds, and is written as `premium` per month; for a Medicare Advantage plan it is the Part D part of the premium, which the PBP files leave out, and is written as `premium.drug_amount`, so that the monthly premium is `premium.amount` plus `premium.drug_amount`.

```bash
node scripts/from-partd-formulary.js --release 2027_20261008 --plan H2406-013-000 --out plan.json   # 1 plan, its list inline
node scripts/from-partd-formulary.js --release 2027_20261008 --formulary 00027002 --out list.json   # 1 list
node scripts/from-partd-formulary.js --release 2027_20261008 --all --out-dir out/                   # every list and plan, and a report
node scripts/validate.js --schema schema/v1.2.0/formulary.schema.json list.json                     # check a list
```

## Results on release 2027_20261008

In a run on November 11, 2026:

- **Lists:** 286, every one valid against the formulary list schema.
- **Plans:** 5,478 written and valid, 0 errors, and 17 refused: 3 suppressed plans, and 14 plans of types the Medicare Advantage importer does not cover (7 cost plans and 7 private fee-for-service plans).
- **Tiers:** every drug of every written plan is on a tier of the plan's document. On the 5,271 tiered plans those are the tiers the Medicare Advantage importer writes, and the Beneficiary Cost tiers equal them; on the 207 Defined Standard plans they are the Beneficiary Cost tiers.
- **The plans' own items:** 14,778 excluded-drug items and 48 indication items on the 16 plans of the Indication Based Coverage file.
- **Against the Medicare Advantage importer's documents:** 642,271 cells and facts compared, 642,243 agree. Of the 28 that differed in that run, 24 were cost cells on 2 plans, on a tier of excluded drugs only after the out-of-pocket threshold, which the Medicare Advantage importer now reads as the file does; the other 4 are plan names.
- **Against the carriers' own drug lists:** 10 drugs on each of 2 plans, 19 of 20 agree. The 1 difference is between the file and the carrier: a vaccine's quantity limit, on a row whose number of days is 999.

## The examples

[`examples/partd-formulary/`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/tree/main/examples/partd-formulary) holds 5 formulary lists of 3,260 to 3,608 drugs and the 5 plan documents that point at them: S5921-383, S4802-146, H2406-013, H1036-068 and H5533-019, the PBP examples with their drug lists. See [Examples](./examples.md).

## What the files do not give

- **Drug names.** The files identify a drug by RXCUI and NDC and name none, so `formulary_items[].drug_name` is optional since the 1.2.0 draft 9 and the importer leaves it out.
- **The unit of a quantity limit.** The files give an amount and a number of days, so `quantity_limit_detail.units` is optional too.
- **The meaning of a 999-day quantity limit**, and the insulin cost file, which the importer does not read yet.

The importer, its decisions D1 to D9 and its column-by-column mapping are in the [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/partd-formulary-importer.md) in the schema repository.
