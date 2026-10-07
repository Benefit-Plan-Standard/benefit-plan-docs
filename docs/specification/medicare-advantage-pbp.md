---
id: medicare-advantage-pbp
title: CMS Medicare Advantage PBP files to the Benefit Plan Standard
sidebar_label: CMS Medicare Advantage PBP files
---

# CMS Medicare Advantage PBP files to the Benefit Plan Standard

The schema repository includes an importer, `scripts/from-pbp.js`, that reads the Plan Benefit Package (PBP) Benefits files published by CMS and writes 1 Benefit Plan Standard (BPS) document per Medicare Advantage plan. It is the second importer for the standard, after the [Marketplace importer](./marketplace-public-files.md). Anyone can run it locally; it needs Node.js, the `ajv` and `ajv-formats` packages that the validator also uses, and the PBP files.

## The CMS file

CMS publishes the PBP Benefits data for each contract year on its [benefits data page](https://www.cms.gov/data-research/statistics-trends-and-reports/medicare-advantagepart-d-contract-and-enrollment-data/benefits-data). The 2027 release is on its own [PBP Benefits-2027 page](https://www.cms.gov/data-research/statistics-trends-and-reports/medicare-advantagepart-d-contract-and-enrollment-data/benefits-data/pbp-benefits-2027) and downloads as 1 zip, [`pbp-benefits-2027.zip`](https://www.cms.gov/files/zip/pbp-benefits-2027.zip), about 23 MB.

PBP Benefits data is the benefit and financial data that Medicare Advantage organizations submit with their bids: for every plan, the cost shares, limits, deductibles, out-of-pocket maximums, out-of-network and point-of-service options, and service area. CMS publishes it as tab-delimited text, 1 file per table, with a dictionary and a readme in the zip.

- **71 tables.** The zip holds 71 data files, 71 SAS input programs, the readme and the dictionary. The tables are by section (A general, C out-of-network and point-of-service, D plan-level financials), by service category (B1 to B20), for optional supplemental packages, for Part D, and for the service area.
- **7,973 plans.** A plan is 1 contract, plan and segment, written `H2406-013-000`. Of the 7,973, the importer builds the 6,872 plans of the 4 Medicare Advantage types it supports: HMO (3,115), HMO with point-of-service option (1,273), local PPO (2,411) and regional PPO (73). The rest are Part D-only plans, PACE, Medical Savings Account, private fee-for-service and cost plans, which the importer refuses.

CMS gives the release no quarter, only the label "PBP Benefits-2027" and the report period 2027; the zip's `Last-Modified` date is October 1, 2026. The files are Windows-1252 text, not UTF-8, and the importer reads them that way.

The files are not in the repository. You download them into `data/pbp/<year>/`, which is git-ignored.

## What the importer produces

1 plan in, 1 BPS v1.2.0 document out. The document is checked against the v1.2.0 schema before it is written; a document that fails is not written. v1.2.0 is the draft in the repository, not v1.1.0, because the PBP data needs fields that only the draft has: the contract, plan and segment identifiers (`plan_identifiers`), the service area, copay and coinsurance ranges, inpatient day intervals, per-ear hearing aid limits and a coverage basis for supplemental benefits.

The importer reads the MVP benefit set, 30 benefits: primary care, specialist, inpatient hospital, outpatient hospital, observation, ambulatory surgery center, emergency and urgent care, ambulance, diagnostic tests, lab, radiology, therapy, chiropractic, podiatry, acupuncture, and hearing and eye exams and hearing aids. Other service categories, such as dental, eyewear, over-the-counter items, meals and Part B drugs, are not imported yet.

What it carries over:

- **Ranges.** When the file gives a minimum and a maximum copay or coinsurance (for example a specialist at $0 to $65), the importer writes both ends. It never picks 1, because the file does not say which service carries the minimum.
- **Day intervals.** Inpatient hospital cost sharing by day (days 1 to 5 at 1 price, days 6 to 90 at another) is written as a per-day step with a day range.
- **Limits.** Visit and treatment limits, dollar maximums, and the hearing aid limits: 1 count per period, per ear or for both ears, and a maximum that hearing aids share with routine hearing exams.
- **Hospital cost tiers.** A plan with tiered inpatient hospital prices gets 1 tier per hospital tier number. The files do not name the facilities in a tier.
- **Network tiers.** `IN` always; `OUT` for PPOs; `POS` for HMO-POS plans.

The importer never adds a value the files do not contain. A Medicare-defined amount that the file names but does not state, such as the Part B deductible, is not filled in. A code outside the dictionary stops the import for that plan, with the column and value quoted, rather than being guessed. A value with no BPS field is kept as text in `source_references[]` (at plan level or on the benefit it belongs to) or in a tier's `notes`, so nothing is dropped without a trace. Each cost share's `notes` quote the file cells it was read from.

**The importer never produces FHIR.** The FHIR converter, `scripts/to-insuranceplan.js`, does that, from the importer's output, unchanged. It is the same converter that produces the [FHIR InsurancePlan files](./fhir-insuranceplan.md) for the other examples.

Over the whole 2027 file, the importer builds all 6,872 plans with 0 errors and 0 schema failures. It raises 117 warnings, all of 1 kind: the 117 Part B-only plans leave their inpatient hospital cost share blank, so that benefit is not written.

## From the file to a FHIR Bundle

First, once per contract year, download and unzip the files into `data/pbp/<year>/` and record the download date in `data/pbp/<year>/download.json` (for example `{"downloaded": "2026-10-06", "release_label": "PBP Benefits-2027"}`). The [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/pbp-importer.md), section 11, gives the exact steps:

```bash
mkdir -p data/pbp/2027 && cd data/pbp/2027
curl -L -O https://www.cms.gov/files/zip/pbp-benefits-2027.zip
unzip pbp-benefits-2027.zip
cd ../../..
```

Then, from the schema repository:

```bash
# 1. Import 1 plan (here UnitedHealthcare, AARP Medicare Advantage from UHC FL-0021, Florida, contract year 2027)
node scripts/from-pbp.js --year 2027 --plan H2406-013-000 --out plan.json

# 2. Validate the BPS document (v1.2.0 schema and vocabularies)
node scripts/validate.js --schema schema/v1.2.0/benefit-plan.schema.json plan.json

# 3. Convert it to a FHIR Bundle; the Bundle is written to stdout
node scripts/to-insuranceplan.js plan.json > plan.insuranceplan.json

# 4. Validate the Bundle with the HL7 FHIR validator
java -Dfile.encoding=UTF-8 -jar validator_cli.jar -version 4.0.1 \
  -ig hl7.fhir.us.insurance-card#2.0.0-ballot \
  -ig fhir/definitions \
  plan.insuranceplan.json
```

To find a plan ID, list a contract's plans:

```bash
node scripts/from-pbp.js --year 2027 --contract H2406
```

An import takes about 5 seconds, most of it reading the 172 MB service area file. The same files and download date always give byte-identical output.

## The benefit crosswalk

Each PBP service category has its own columns, and their names differ from category to category (`pbp_b7a_copay_amt_mc_min`, `pbp_b7b_copay_mc_amt_min`, `pbp_b18a_copay_amt`). The crosswalk, [`fhir/pbp-crosswalk.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/fhir/pbp-crosswalk.json), has 1 row per benefit the importer writes. Each row names the PBP category, the file, every column read, and the BPS canonical benefit key, or nothing.

**30 benefits: 19 mapped, 11 unmapped.** The 11 unmapped are still written, carried by name and by the dictionary's label, with no canonical key. They are the combined physical therapy and speech-language pathology row, podiatry and routine foot care (2), hearing exams (2), eye exams (2), and the prescription hearing aids (4 rows), because the canonical vocabulary has no key for them.

A category maps only when it clearly is the canonical service. There is no nearest fit, because a nearest fit would attach a cost share to a service it does not describe. Physical therapy and speech-language pathology is 1 category in the PBP file and 2 services in the standard, so mapping it to either key would put the wrong price on the other.

## The 5 examples

| BPS document | Plan | Contract year | FHIR Bundle |
|---|---|---|---|
| [`unitedhealthcare-aarp-medicare-advantage-from-uhc-fl-0021.pbp.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/unitedhealthcare-aarp-medicare-advantage-from-uhc-fl-0021.pbp.json) | UnitedHealthcare, AARP Medicare Advantage from UHC FL-0021 (PPO), H2406-013-000, Florida, local PPO, 7 counties | 2027 | [`aarp-medicare-advantage-from-uhc-fl-0021-ppo-h2406-013-000.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/aarp-medicare-advantage-from-uhc-fl-0021-ppo-h2406-013-000.json) |
| [`humana-humana-gold-plus-h1036-068.pbp.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/humana-humana-gold-plus-h1036-068.pbp.json) | Humana, Humana Gold Plus H1036-068 (HMO), H1036-068-000, Florida, 9 counties | 2027 | [`humana-gold-plus-h1036-068-hmo-h1036-068-000.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/humana-gold-plus-h1036-068-hmo-h1036-068-000.json) |
| [`aetna-medicare-aetna-medicare-select-extra.pbp.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/aetna-medicare-aetna-medicare-select-extra.pbp.json) | Aetna Medicare, Aetna Medicare Select Extra (HMO-POS), H1609-028-000, Florida, 11 counties | 2027 | [`aetna-medicare-select-extra-hmo-pos-h1609-028-000.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/aetna-medicare-select-extra-hmo-pos-h1609-028-000.json) |
| [`upmc-for-life-upmc-for-life-ppo-rx-choice.pbp.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/upmc-for-life-upmc-for-life-ppo-rx-choice.pbp.json) | UPMC for Life, UPMC for Life PPO Rx Choice (PPO), H5533-019-000, Pennsylvania, 1 county | 2027 | [`upmc-for-life-ppo-rx-choice-ppo-h5533-019-000.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/upmc-for-life-ppo-rx-choice-ppo-h5533-019-000.json) |
| [`scan-health-plan-scan-costco-medicare-advantage.pbp.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/scan-health-plan-scan-costco-medicare-advantage.pbp.json) | SCAN Health Plan, SCAN Costco Medicare Advantage (HMO), H5425-140-000, California, 1 county | 2027 | [`scan-costco-medicare-advantage-hmo-h5425-140-000.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/scan-costco-medicare-advantage-hmo-h5425-140-000.json) |

The 5 plans were chosen to cover the cases: the UnitedHealthcare PPO has an out-of-network deductible and copay ranges; the Humana HMO has no deductible; the Aetna plan is an HMO-POS with point-of-service groups; the UPMC plan has inpatient hospital cost tiers; the SCAN plan has hearing aids that share the routine hearing exam maximum.

Each BPS document has 27 of the 30 crosswalk benefits. The 3 not written are the hearing aid rows for a single aid type (inner ear, outer ear, over the ear), which are written only when a plan chooses that type. Each Bundle places 14 of the 27 and lists 13 by name only, because the converter's crosswalk places those keys on none of the 29 benefit category codes of the CARIN SBC InsurancePlan profile. The 5 Bundles are in `examples/fhir/`, beside the 10 that are published on this site, and they are not published here: the published Bundles are the 10 on [FHIR InsurancePlan](./fhir-insuranceplan.md).

## What the PBP files do not carry

Some BPS fields have nothing to fill them in the PBP files:

- **No dates.** There is no effective date, expiry date or coverage period. The plan year comes from the contract year.
- **No accumulator or limit period.** The files say "Every year", never plan year or calendar year, so `period` is not written on accumulators and a yearly limit is written as `per_year`.
- **No family amounts.** Section D gives individual deductibles and out-of-pocket maximums only.
- **No page numbers.** The files are tables, not documents, so every source reference is text with no page.
- **No FIPS county codes.** The service area file uses the Social Security Administration (SSA) county code, which is not FIPS (Duval County, Florida is `10150` in the file and `12031` in FIPS). The importer writes the county name, leaves `fips` empty and keeps the SSA code as text.
- **Cost-share basis on most services.** The files say per visit only for a few categories, so `basis` is written only where the file states it.

Going the other way, the PBP files carry things BPS has no field for. The importer keeps each one as text, and the spec lists each with a proposed field:

- the combined in-network and out-of-network deductible and out-of-pocket maximum (the Summary of Benefits prints the combined maximum in its out-of-network column);
- a Medicare-defined deductible or cost share with no amount in the file, such as the Part B deductible or the Medicare-defined inpatient stay;
- the out-of-pocket maximum type (lower, intermediate or mandatory) and service-specific out-of-pocket maximums;
- which services a deductible covers, as a list of service categories;
- which service carries the minimum of a range;
- whether a cost share counts toward the plan deductible, as distinct from being subject to it;
- hearing aid copays per pair of aids, and a coinsurance rate's base ("90% of the allowance");
- a supplemental benefit that is both mandatory and optional;
- the plan's counties across more than 1 state, partial counties, and the regions of a regional PPO;
- employer-only and special needs plan flags;
- the facilities in a hospital cost tier, which the files do not name.

The full list, with each workaround, is in section 9 of the [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/pbp-importer.md#9-schema-gaps-found). Optional supplemental packages and cost sharing for special populations are not read at all; the v1.2.0 draft defers both.

## The Summary of Benefits check

The PBP file is data that carriers submit; the document a member sees is the Summary of Benefits. To check the importer against it, the schema repository has a script, `scripts/pbp-sob-check.js`, that compares an imported document with the values a plan's Summary of Benefits prints. Its input is 1 expectations file per plan, with the printed value, its page, and where it sits in the document. Each check comes out as:

- `MATCH`: the document holds the printed value;
- `READING`: the document holds a different value on purpose, and the check says why (for example, the file gives a range where the Summary of Benefits prints 1 end of it);
- `DIFFERENCE`: the document disagrees, and the script exits with an error.

Two plans are checked, each to 0 differences:

| Plan | Summary of Benefits | Checks | Match | Reading | Difference |
|---|---|---|---|---|---|
| H2406-013-000, UnitedHealthcare PPO | 2027, document ID `Y0066_SB_H2406_013_000_2027_M` | 61 | 53 | 8 | 0 |
| H1609-028-000, Aetna HMO-POS | 2027, document ID `Y0001_H1609_028_HP32_SB2027_M` | 33 | 23 | 10 | 0 |

Reading the PDFs and writing the expectations files is done by hand; the script does the comparison. The check has limits. Some readings are confirmed on 1 plan only, and the spec lists what is still to confirm: the out-of-network deductible rule for PPOs (UnitedHealthcare only), the $0 cost share for a service answered "No" to both copay and coinsurance (no Summary of Benefits checked yet), and the out-of-network maximum of HMO-POS plans.

## HMO-POS plans

An HMO with a point-of-service option (HMO-POS) has no out-of-network benefit in the PBP file: all 1,273 declare a point-of-service option instead. The importer writes them a `POS` tier, and reads the file's out-of-network deductible and out-of-pocket maximum columns as the POS option's, with a note quoting the columns.

That reading is confirmed on 1 plan, Aetna Medicare Select Extra (H1609-028-000), from 2 sources:

- **Aetna's 2027 Summary of Benefits** prints the point-of-service side under "Your out-of-network costs": no in-network deductible and $500 for certain out-of-network services (page 2), a specialist at $70 after the plan deductible, and an inpatient stay at 50% after the plan deductible (page 3).
- **CMS Medicare Plan Finder** for the same plan labels the $500 deductible "Out-of-network" and prints the specialist at $0 to $38 in network and $70 out of network.

The converter maps the `POS` tier to out-of-network with a text-only qualifier, "Point-of-service option". Before it did, the converter refused the tier, and no HMO-POS plan reached FHIR. The 10 published Bundles are byte-identical before and after the change.

Where a plan's Section C and Section D disagree on the point-of-service deductible (12 plans), the importer writes Section D and quotes Section C with a note. Also open: a covered service that the plan's point-of-service list leaves out, which the Aetna Summary of Benefits prints as "Not Covered" (4 checked rows). The importer writes no `POS` row for it, and the converter's "Not stated in the BPS document" placeholder shows in its place.

## The validator result

The 5 Bundles were validated on October 6, 2026 with the HL7 FHIR validator 7.0.0, FHIR 4.0.1, against `hl7.fhir.us.insurance-card#2.0.0-ballot` and the BPS definitions in `fhir/definitions`. All 5 pass with **0 errors**. 15 warnings:

| Bundle | Errors | Warnings |
|---|---|---|
| `aarp-medicare-advantage-from-uhc-fl-0021-ppo-h2406-013-000.json` | 0 | 0 |
| `humana-gold-plus-h1036-068-hmo-h1036-068-000.json` | 0 | 0 |
| `aetna-medicare-select-extra-hmo-pos-h1609-028-000.json` | 0 | 11 |
| `upmc-for-life-ppo-rx-choice-ppo-h5533-019-000.json` | 0 | 4 |
| `scan-costco-medicare-advantage-hmo-h5425-140-000.json` | 0 | 0 |

The 15 warnings are of 2 kinds:

- **14 are text-only cost qualifiers.** The profile's Cost Tier value set has only `value-choice`, `standard` and `virtual`, so the importer's tiers have no code: 10 `Point-of-service option` entries on the Aetna Bundle and 4 hospital cost tier names on the UPMC Bundle. The binding is extensible, so each carries its name as text.
- **1 is the Aetna plan type.** The SBC Plan Type value set has no code for HMO-POS, so the converter writes the plan type as text.

The information messages are the extension slicing messages that the 10 SBC Bundles raise too. The full record is the second run in [`examples/fhir/VALIDATION.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/VALIDATION.md).

The importer, its decisions and its open questions are in the [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/pbp-importer.md), and the table layout is in the [record layout notes](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/pbp-record-layout-notes.md).
