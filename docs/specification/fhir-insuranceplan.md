---
id: fhir-insuranceplan
title: FHIR InsurancePlan Files
sidebar_label: FHIR InsurancePlan
---

# FHIR InsurancePlan Files

Every Benefit Plan Standard example is also published as a FHIR R4 `InsurancePlan`. The FHIR files are produced by a converter in the schema repository (`scripts/to-insuranceplan.js`), which anyone can run locally.

**These are static JSON files, not a FHIR API.** There is no FHIR server, endpoint, search, `_format` parameter or other REST behavior. You download a file the same way you would download any other file from this site. Inside each file, the `Bundle.entry.fullUrl` values are `urn:uuid:` identifiers, not addresses.

## Profile status

Each `InsurancePlan` targets the CARIN Digital Insurance Card **SBC InsurancePlan** profile (`http://hl7.org/fhir/us/insurance-card/StructureDefinition/sbc-insurance-plan`).

That profile is **draft and experimental**. It exists only in the ballot package `hl7.fhir.us.insurance-card#2.0.0-ballot` (STU 2 ballot, September 2026), not in any published release of the CARIN Digital Insurance Card IG. The same goes for its extensions (`DeductibleApplies`, `CostAppliesToNetwork`, `BenefitLimitation`) and the code systems it binds. The files are validated against that ballot package and will be refreshed once STU 2.0.0 publishes.

## The files

The list is also available as JSON: [`/fhir/index.json`](https://benefitplanstandard.org/fhir/index.json). The index is a plain JSON list, not a FHIR resource.

| File | Plan | BPS schema | Benefits placed | Benefits outside the SBC codes |
|---|---|---|---|---|
| [`aetna-ppo-1500-80-50.json`](https://benefitplanstandard.org/fhir/InsurancePlan/aetna-ppo-1500-80-50.json) | Aetna FL PPO 1500 80/50 CY V25 | 1.1.0 | 26 | 1 |
| [`aetna-ppo-5000-80-50.json`](https://benefitplanstandard.org/fhir/InsurancePlan/aetna-ppo-5000-80-50.json) | Aetna FL PPO 5000 80/50 CY V25 | 1.1.0 | 26 | 1 |
| [`ambetter-ca-silver-94-hmo.json`](https://benefitplanstandard.org/fhir/InsurancePlan/ambetter-ca-silver-94-hmo.json) | Health Net of CA: Silver 94 Ambetter HMO | 1.1.0 | 27 | 3 |
| [`cigna-oap-bowdoin.json`](https://benefitplanstandard.org/fhir/InsurancePlan/cigna-oap-bowdoin.json) | Bowdoin College: Open Access Plus (Cigna) | 1.1.0 | 26 | 4 |
| [`flblue-blueoptions-505.json`](https://benefitplanstandard.org/fhir/InsurancePlan/flblue-blueoptions-505.json) | Florida Blue BlueOptions 505 | 1.1.0 | 27 | 4 |
| [`gatorcare-prime-epo.json`](https://benefitplanstandard.org/fhir/InsurancePlan/gatorcare-prime-epo.json) | Florida Blue BlueOptions 03768 - Prime EPO Plan (GatorCare) | 1.1.0 | 25 | 4 |
| [`humana-gold-plus-h1036-025-hmo.json`](https://benefitplanstandard.org/fhir/InsurancePlan/humana-gold-plus-h1036-025-hmo.json) | Humana Gold Plus H1036-025 (HMO). Medicare Advantage, keyed by hand from the CMS Summary of Benefits, validates against the v1.2.0 draft only. | 1.2.0 | 26 | 46 |
| [`kaiser-ca-gold-80-hmo.json`](https://benefitplanstandard.org/fhir/InsurancePlan/kaiser-ca-gold-80-hmo.json) | KAISER PERMANENTE®: Gold 80 HMO | 1.1.0 | 28 | 3 |
| [`scan-classic-hmo-los-angeles.json`](https://benefitplanstandard.org/fhir/InsurancePlan/scan-classic-hmo-los-angeles.json) | SCAN Classic (HMO), Los Angeles County (SCAN Health Plan). Medicare Advantage, keyed by hand from the CMS Summary of Benefits, validates against the v1.2.0 draft only. | 1.2.0 | 22 | 49 |
| [`uhc-choice-plus-hsa-gold-1700.json`](https://benefitplanstandard.org/fhir/InsurancePlan/uhc-choice-plus-hsa-gold-1700.json) | UnitedHealthcare® UHC Choice Plus HSA Gold 1700-4 | 1.1.0 | 26 | 3 |

The two Medicare Advantage files come from CMS Summary of Benefits documents, which are not SBCs. They conform structurally to the SBC profile, but most of their benefits (dental, vision, hearing, supplemental benefits, Part B drugs) have no code in the SBC benefit category code system, so those benefits are listed by identity only (see below).

## Fetching a file

```bash
curl -O https://benefitplanstandard.org/fhir/InsurancePlan/aetna-ppo-1500-80-50.json
curl https://benefitplanstandard.org/fhir/index.json
```

Each file is a FHIR `Bundle` of type `collection` with two entries: the `InsurancePlan` and the `Organization` named in `InsurancePlan.ownedBy`. File names and resource ids come from the BPS `plan_id`, and the files stay byte-identical from one run to the next.

## Reading a file

- **Benefits.** A benefit appears in both `InsurancePlan.coverage[].benefit[]` and `InsurancePlan.plan[0].specificCost[].benefit[]`. Its `type` carries an SBC benefit category code, followed by the BPS canonical benefit key as a second coding.
- **Benefits outside the SBC codes.** The profile requires every benefit type to come from a 29-code SBC benefit category code system. A BPS benefit with no code there, such as chiropractic care, acupuncture or bariatric surgery, is not placed in `coverage` or `specificCost`. It is listed in a `bps-unmapped-benefit` extension on the `InsurancePlan`, which identifies the benefit but does not carry its cost sharing. Home health care is in this group for the eight SBC plans and for SCAN, because the code system has no general home health code. (The Humana file has no home health benefit.)
- **Not covered.** A cost entry with type text `Not covered` has no amount; its `value` carries a `data-absent-reason` of `not-applicable`. It is not a $0 cost.
- **`Not stated in the BPS document`.** The profile requires at least two cost entries per benefit. When the BPS document gives only one (for example, a benefit the BPS file prices only in network), a second entry is added for the missing network with this text and a `data-absent-reason` of `unknown`. It does not mean the benefit is covered or not covered there.
- **`Covered; amount not stated in the BPS document`.** The BPS document marks the benefit as covered in that network but records no amount.
- **Contact.** BPS documents carry no plan contact details. The required `contact` is present with a `data-absent-reason` of `unknown` and no phone number or URL.
- **Page references.** The eight SBC files carry page references for the plan document as a whole, on the `InsurancePlan`, in `bps-source-reference` extensions. They are not per-benefit citations. The two Medicare Advantage files also carry page references on each placed benefit.
- **Everything else from BPS** (network tier ids, cost-share basis, out-of-pocket applicability, accumulator period, conditions, market, schema version) is carried in `bps-*` extensions.

## BPS extension definitions

The `bps-*` extensions and the BPS canonical benefits code system are draft, and are published as static files:

- `https://benefitplanstandard.org/fhir/StructureDefinition/<name>.json`, for `bps-source-reference`, `bps-plan-metadata`, `bps-identifier-source`, `bps-benefit`, `bps-condition`, `bps-cost-share`, `bps-accumulator` and `bps-unmapped-benefit`
- [`https://benefitplanstandard.org/fhir/CodeSystem/canonical-benefits.json`](https://benefitplanstandard.org/fhir/CodeSystem/canonical-benefits.json)

Their canonical URLs (`https://benefitplanstandard.org/fhir/StructureDefinition/<name>`, without `.json`) are identifiers. They do not resolve to the file. To validate against them, load the definitions locally, as shown below.

## Running the converter locally

```bash
git clone https://github.com/Benefit-Plan-Standard/benefit-plan-schema.git
cd benefit-plan-schema
npm install ajv ajv-formats

# Convert one BPS document (v1.1.0 or v1.2.0); the Bundle is written to stdout
node scripts/to-insuranceplan.js examples/aetna_example.json > aetna.fhir.json

# Run the tests (fails if output drifts from the files in examples/fhir/)
node --test scripts/to-insuranceplan.test.js
```

The converter makes no network calls and keeps no state. It checks the input against the BPS schema version the document declares, and exits with an error rather than guessing when a document has something it cannot map, such as a network tier other than `IN` or `OUT`. The mapping is specified in [`docs/specs/insuranceplan-converter.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/specs/insuranceplan-converter.md).

## Validating

With the HL7 FHIR validator ([`validator_cli.jar`](https://github.com/hapifhir/org.hl7.fhir.core/releases/latest)), from the schema repository:

```bash
java -jar validator_cli.jar -version 4.0.1 \
  -ig hl7.fhir.us.insurance-card#2.0.0-ballot \
  -ig fhir/definitions \
  examples/fhir/*.json
```

All ten files validate with zero errors. The warnings, all of them expected, are listed and explained in [`examples/fhir/VALIDATION.md`](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/examples/fhir/VALIDATION.md).
