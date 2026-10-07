---
id: marketplace-public-files
title: CMS Marketplace public files to the Benefit Plan Standard
sidebar_label: Marketplace public files
---

# CMS Marketplace public files to the Benefit Plan Standard

The schema repository includes an importer, `scripts/from-marketplace-puf.js`, that reads 2 public files published by CMS and writes 1 Benefit Plan Standard (BPS) document per plan. It is the first importer for the standard. Anyone can run it locally; it needs Node.js, the `ajv` and `ajv-formats` packages that the validator also uses, and the 2 files.

Where this importer sits beside the Medicare Advantage importer and the FHIR converter, with every command, is on [How the data flows](./data-flow.md).

## The 2 public files

CMS publishes the Health Insurance Exchange public use files (PUFs) for each plan year on its [public use files page](https://www.cms.gov/marketplace/resources/data/public-use-files). The importer reads 2 of them:

- **Plan Attributes PUF.** 1 row per plan variant: names, issuer, plan type, metal level, market, dates, deductibles and out-of-pocket maximums, in 151 columns.
- **Benefits and Cost Sharing PUF.** 1 row per plan variant per benefit: whether the benefit is covered, the copay and coinsurance for in-network tier 1, in-network tier 2 and out of network, any quantity limit, and free-text exclusions and explanations.

The files cover only the states that use the federal platform for a given plan year: states on the Federally-facilitated Exchange (including those doing their own plan management) and State-based Exchanges that use the federal platform. States that run their own platform, such as California and New York, are not in them. Plan year 2026 covers 30 states: AK, AL, AR, AZ, DE, FL, HI, IA, IN, KS, LA, MI, MO, MS, MT, NC, ND, NE, NH, OH, OK, OR, SC, SD, TN, TX, UT, WI, WV and WY. The list changes from year to year, so check the year's general information document on the CMS page.

The files are not in the repository. You download them into `data/puf/<year>/`, which is git-ignored.

## What the importer produces

1 plan variant in, 1 BPS v1.1.0 document out. The document is checked against the v1.1.0 schema before it is written; a document that fails is not written. Medical plans only: a stand-alone dental plan is refused.

The importer never adds a value the files do not contain. A cost-share string it cannot read stops the import for that plan, with the string quoted, rather than being guessed. A value with no BPS field is kept as text in `source_references[]` or in a tier's `notes`, so nothing is dropped without a trace.

**The importer never produces FHIR.** The FHIR converter, `scripts/to-insuranceplan.js`, does that, from the importer's output, unchanged. It is the same converter that produces the [FHIR InsurancePlan files](./fhir-insuranceplan.md) for the other examples.

## From the public files to a FHIR Bundle

First, once per plan year, download and unzip the 2 files into `data/puf/<year>/` and record the download date in `data/puf/<year>/download.json` (for example `{"downloaded": "2026-10-05"}`). The [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/marketplace-puf-importer.md), section 11, gives the exact steps. Then, from the schema repository:

```bash
# 1. Import 1 plan variant (here UnitedHealthcare, UHC Gold Standard, Texas, plan year 2026)
node scripts/from-marketplace-puf.js --year 2026 --plan 40220TX0080024-01 --out plan.json

# 2. Validate the BPS document (v1.1.0 schema and vocabularies)
node scripts/validate.js plan.json

# 3. Convert it to a FHIR Bundle; the Bundle is written to stdout
node scripts/to-insuranceplan.js plan.json > plan.insuranceplan.json

# 4. Validate the Bundle with the HL7 FHIR validator
java -jar validator_cli.jar -version 4.0.1 \
  -ig hl7.fhir.us.insurance-card#2.0.0-ballot \
  -ig fhir/definitions \
  plan.insuranceplan.json
```

To find a plan ID, list an issuer's plans in a state:

```bash
node scripts/from-marketplace-puf.js --year 2026 --issuer 40220 --state TX
```

An import takes about 7 seconds for plan year 2026, because it streams both files. The same 2 files and download date always give byte-identical output.

## The benefit crosswalk

Each benefit row in the Benefits and Cost Sharing PUF has a `BenefitName`. The crosswalk, [`fhir/marketplace-puf-crosswalk.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/fhir/marketplace-puf-crosswalk.json), maps every distinct name in the plan year 2026 file to a BPS canonical benefit key, or to nothing.

**273 names: 71 mapped, 202 unmapped.** 51 of the unmapped names are adult or pediatric dental rows; most of the rest are state-specific benefits with no canonical key.

A name maps only when the public-file benefit clearly is the canonical service. There is no nearest fit, because a nearest fit would attach a cost share to a service it does not describe. "Prenatal and Postnatal Care" is 1 row in the file and 2 keys in the standard; "Rehabilitative Occupational and Rehabilitative Physical Therapy" is likewise 2 keys; "Infusion Therapy" does not say whether it is at a center or at home, and the standard keeps those apart. Mapping any of them to 1 key would put the wrong price on the other service. An unmapped row is listed by name, with "Covered" or "Not Covered", in the document's `source_references[]`; its cost shares are not carried.

A name from another plan year that is not in the crosswalk is imported as unmapped and marked "not in the crosswalk".

## The parse report

The [parse report](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/marketplace-puf-parse-report.md) lists every distinct cost-share string in the plan year 2026 Benefits and Cost Sharing PUF and how the importer reads it: type, amount or rate, deductible flag and basis. It is produced by `node scripts/puf-parse-report.js`, which runs the importer's own parser, so each reading is exactly what the importer writes.

For plan year 2026 it covers 1,457,952 rows and 22,059 plan variants: 434 distinct strings (373 in copay columns, 61 in coinsurance columns), and 0 the importer cannot read.

It has 2 uses. It lets a reader check any reading without running the importer, for example that "$40.00" is a copay that does not apply to the deductible while "$40.00 Copay after deductible" does. And for a new plan year, running it first shows every new string form in its "Unreadable strings" table before any plan is imported.

## The 3 examples

| BPS document | Plan | Plan year | FHIR Bundle |
|---|---|---|---|
| [`blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.puf.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.puf.json) | Blue Cross and Blue Shield of Louisiana, Blue Max Copay (PCP) 50/50 $3300, Silver PPO | 2026 | [`fhir-puf/blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir-puf/blue-cross-and-blue-shield-of-louisiana-blue-max-copay-50-50.json) |
| [`florida-blue-blueoptions-gold-1505.puf.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/florida-blue-blueoptions-gold-1505.puf.json) | Florida Blue, BlueOptions Gold 1505, Gold EPO | 2023 | [`fhir-puf/florida-blue-blueoptions-gold-1505.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir-puf/florida-blue-blueoptions-gold-1505.json) |
| [`unitedhealthcare-uhc-gold-standard.puf.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/unitedhealthcare-uhc-gold-standard.puf.json) | UnitedHealthcare, UHC Gold Standard, Texas, Gold HMO | 2026 | [`fhir-puf/unitedhealthcare-uhc-gold-standard.json`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir-puf/unitedhealthcare-uhc-gold-standard.json) |

Each BPS document has 44 benefits. Each Bundle places 27 of them and lists 17 by name only, because the converter's crosswalk places those keys on none of the 29 benefit category codes of the CARIN SBC InsurancePlan profile. The 3 Bundles validate with 0 errors; the warnings are explained in the [`fhir-puf` README](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir-puf/README.md). They are not published on this site: the published Bundles are the 10 on [FHIR InsurancePlan](./fhir-insuranceplan.md).

The Florida Blue example is not the same plan as the BlueOptions 505 example on [Examples](./examples.md): the plan year 2023 file has no BlueOptions 505, and Gold 1505 is the closest row by name. The [comparison](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/marketplace-puf-vs-sbc-flblue-505.md) sets the 2 side by side.

## What the public files do not carry

Some BPS fields have nothing to fill them in the public files:

- **No accumulator period.** The files give deductible and out-of-pocket amounts but do not say plan year or calendar year, so `period` is not written. Quantity limits say "per Year", never plan year or calendar year.
- **No copay basis beyond per day or per stay.** A copay string says "per Day" or "per Stay" or nothing; the files never say per visit or per prescription, so `basis` is written only for those 2.
- **No page numbers.** The files are tables, not documents, so every source reference is text with no page.
- No coverage period separate from the plan dates, and no place of service.

Going the other way, the public files carry things BPS v1.1.0 has no field for. The importer keeps each one as text in `source_references[]` (or, for explanations, as a condition):

- the HIOS plan ID (the v1.2.0 draft adds `plan_identifiers`);
- metal level, cost-sharing reduction variation and HSA eligibility;
- tier 2 accumulators, and accumulators combined across in and out of network;
- a separate drug deductible and out-of-pocket maximum (the v1.2.0 draft adds a `pharmacy` object);
- a family per-person amount with no family total;
- the plan's default coinsurance;
- benefit-level explanation text (no benefit notes field);
- network, service area and formulary IDs;
- "first N visits" cost-share rules and a cap on the number of per-day inpatient copays.

The essential health benefit flag is not carried at all. The full list, with each workaround, is in section 9 of the [importer spec](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/marketplace-puf-importer.md#9-schema-gaps-found).

## A second in-network tier

The Benefits and Cost Sharing PUF has 2 in-network tiers. In plan year 2026, 5,351 of 20,670 medical plan variants (26%) have tier 2 values. The importer writes a third network tier, `IN2`, only when at least 1 of the plan's benefits has a tier 2 value, and names it "In-Network Tier 2", because the files do not name tiers. The converter maps `IN2` to in-network with a cost-tier qualifier: the CARIN code `value-choice` when the tier name says "Value Choice", and text only otherwise. Tier 1 entries carry no qualifier. Since the importer's tier name never says "Value Choice", imported tier 2 entries are text only, and the HL7 validator warns once for each. A caution for readers of the Florida Blue example: the Marketplace template the issuer fills in labels Florida Blue's Value Choice prices as tier 1. In Gold 1505, tier 1 holds the lower prices that the plan's own explanation text gives for "Value Choice Providers" (primary care: tier 1 "No Charge", tier 2 "$20.00"), and the plan attributes report 0% first-tier and 100% second-tier utilization. So the qualified tier 2 entries in that Bundle are the plan's regular in-network prices, and the unqualified in-network entries are the Value Choice prices.
