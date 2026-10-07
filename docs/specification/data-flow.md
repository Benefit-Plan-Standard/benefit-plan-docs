---
id: data-flow
title: "How the data flows: from CMS files to FHIR"
sidebar_label: How the data flows
---

# How the data flows: from CMS files to FHIR

Two public CMS inputs, each read by its own importer, become one Benefit Plan Standard (BPS) document per plan. One converter, `scripts/to-insuranceplan.js`, turns that document into one output: a FHIR InsurancePlan file, and it is the only step that writes FHIR.

<svg width="100%" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="bps-flow-title bps-flow-desc" style={{maxWidth: '1100px', height: 'auto', display: 'block', margin: '1.5rem 0'}}>
  <title id="bps-flow-title">How the data flows: from CMS files to FHIR</title>
  <desc id="bps-flow-desc">The CMS Marketplace public use files are read by from-marketplace-puf.js and the CMS Medicare Advantage plan benefit package files are read by from-pbp.js. Both write a Benefit Plan Standard document. to-insuranceplan.js converts the document into an InsurancePlan in the CARIN Digital Insurance Card profile, FHIR R4, one file per plan.</desc>
  <defs>
    <marker id="bps-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#7dd3fc" />
    </marker>
  </defs>
  <rect x="20" y="40" width="250" height="130" rx="18" fill="#0f172a" stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" />
  <text x="145" y="85" textAnchor="middle" fill="#f9fafb" fontSize="17" fontWeight="600">CMS Marketplace</text>
  <text x="145" y="108" textAnchor="middle" fill="#f9fafb" fontSize="17" fontWeight="600">public use files</text>
  <text x="145" y="135" textAnchor="middle" fill="#cbd5f5" fontSize="13">Plan Attributes PUF</text>
  <text x="145" y="153" textAnchor="middle" fill="#cbd5f5" fontSize="13">Benefits and Cost Sharing PUF</text>
  <rect x="20" y="250" width="250" height="130" rx="18" fill="#0f172a" stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" />
  <text x="145" y="295" textAnchor="middle" fill="#f9fafb" fontSize="17" fontWeight="600">CMS Medicare Advantage</text>
  <text x="145" y="318" textAnchor="middle" fill="#f9fafb" fontSize="17" fontWeight="600">plan benefit package files</text>
  <text x="145" y="345" textAnchor="middle" fill="#cbd5f5" fontSize="13">PBP Benefits, 1 zip</text>
  <text x="145" y="363" textAnchor="middle" fill="#cbd5f5" fontSize="13">per contract year</text>
  <line x1="272" y1="105" x2="466" y2="105" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#bps-flow-arrow)" />
  <a href="/docs/specification/marketplace-public-files">
    <text x="369" y="93" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" textDecoration="underline">from-marketplace-puf.js</text>
  </a>
  <line x1="272" y1="315" x2="466" y2="315" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#bps-flow-arrow)" />
  <a href="/docs/specification/medicare-advantage-pbp">
    <text x="369" y="303" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" textDecoration="underline">from-pbp.js</text>
  </a>
  <rect x="470" y="50" width="230" height="320" rx="18" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
  <text x="585" y="170" textAnchor="middle" fill="#f9fafb" fontSize="18" fontWeight="600">Benefit Plan Standard</text>
  <text x="585" y="194" textAnchor="middle" fill="#f9fafb" fontSize="18" fontWeight="600">document</text>
  <text x="585" y="224" textAnchor="middle" fill="#cbd5f5" fontSize="13">JSON, one per plan</text>
  <text x="585" y="250" textAnchor="middle" fill="#cbd5f5" fontSize="13">Schema v1.1.0 (current)</text>
  <text x="585" y="268" textAnchor="middle" fill="#cbd5f5" fontSize="13">v1.2.0 draft for Medicare Advantage</text>
  <line x1="702" y1="210" x2="866" y2="210" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#bps-flow-arrow)" />
  <a href="/docs/specification/fhir-insuranceplan">
    <text x="784" y="198" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" textDecoration="underline">to-insuranceplan.js</text>
  </a>
  <rect x="870" y="120" width="210" height="180" rx="18" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
  <text x="975" y="168" textAnchor="middle" fill="#f9fafb" fontSize="18" fontWeight="600">InsurancePlan.</text>
  <text x="975" y="198" textAnchor="middle" fill="#cbd5f5" fontSize="13">CARIN Digital Insurance</text>
  <text x="975" y="216" textAnchor="middle" fill="#cbd5f5" fontSize="13">Card profile, FHIR R4.</text>
  <text x="975" y="246" textAnchor="middle" fill="#cbd5f5" fontSize="13">One file per plan.</text>
</svg>

The commands below run from the schema repository. Each section links to the page that explains the step.

## Get the files

Clone the schema repository and install the two packages the validator and the importers use. Then download each CMS file set into its git-ignored folder, once per year:

```bash
git clone https://github.com/Benefit-Plan-Standard/benefit-plan-schema.git && cd benefit-plan-schema
npm install ajv ajv-formats     # one time

# CMS Marketplace public use files, once per plan year
mkdir -p data/puf/2026 && cd data/puf/2026
curl -O https://download.cms.gov/marketplace-puf/2026/plan-attributes-puf.zip
curl -O https://download.cms.gov/marketplace-puf/2026/benefits-and-cost-sharing-puf.zip
unzip plan-attributes-puf.zip && unzip benefits-and-cost-sharing-puf.zip
cd ../../..

# CMS Medicare Advantage PBP Benefits files, once per contract year
mkdir -p data/pbp/2027 && cd data/pbp/2027
curl -L -O https://www.cms.gov/files/zip/pbp-benefits-2027.zip
unzip pbp-benefits-2027.zip
cd ../../..
```

Record the download date in `data/puf/2026/download.json` (`{"downloaded": "YYYY-MM-DD"}`) and in `data/pbp/2027/download.json` (`{"downloaded": "YYYY-MM-DD", "release_label": "PBP Benefits-2027"}`). Explained on [CMS Marketplace public files](./marketplace-public-files.md#the-2-public-files) and [CMS Medicare Advantage PBP files](./medicare-advantage-pbp.md#the-cms-file).

## Import Marketplace

List an issuer's plans in a state, then import one plan variant into a BPS v1.1.0 document:

```bash
node scripts/from-marketplace-puf.js --year 2026 --issuer 40220 --state TX
node scripts/from-marketplace-puf.js --year 2026 --plan 40220TX0080024-01 --out plan.json
```

Explained on [CMS Marketplace public files](./marketplace-public-files.md#from-the-public-files-to-a-fhir-bundle).

## Import Medicare Advantage

List a contract's plans, then import one plan into a BPS document on the v1.2.0 draft schema:

```bash
node scripts/from-pbp.js --year 2027 --contract H2406
node scripts/from-pbp.js --year 2027 --plan H2406-013-000 --out h2406.json
```

Explained on [CMS Medicare Advantage PBP files](./medicare-advantage-pbp.md#from-the-file-to-a-fhir-bundle).

## Convert to FHIR

The converter reads either importer's output unchanged and writes one Bundle per document, to stdout or to a file:

```bash
node scripts/to-insuranceplan.js plan.json > plan.insuranceplan.json
node scripts/to-insuranceplan.js h2406.json -o h2406.bundle.json
```

Explained on [FHIR InsurancePlan](./fhir-insuranceplan.md#running-the-converter-locally).

## Validate

Check each BPS document against the schema version it declares, then check the Bundles with the HL7 FHIR validator against the CARIN Digital Insurance Card ballot package:

```bash
node scripts/validate.js plan.json
node scripts/validate.js --schema schema/v1.2.0/benefit-plan.schema.json h2406.json

java -Dfile.encoding=UTF-8 -jar validator_cli.jar -version 4.0.1 \
  -ig hl7.fhir.us.insurance-card#2.0.0-ballot \
  -ig fhir/definitions \
  plan.insuranceplan.json h2406.bundle.json
```

Explained on [FHIR InsurancePlan](./fhir-insuranceplan.md#validating).

This site does not redistribute CMS files or carrier documents: you download the CMS files from CMS.
