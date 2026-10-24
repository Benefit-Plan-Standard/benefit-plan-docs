# 🌐 Benefit Plan Standard: Documentation  
The official documentation site for the open, vendor-neutral data standard for representing U.S. health insurance benefit plans.

<p align="left">
  <a href="https://benefitplanstandard.org">
    <img src="https://img.shields.io/badge/Documentation-Live-blue?style=for-the-badge" />
  </a>
  <a href="https://github.com/Benefit-Plan-Standard/benefit-plan-schema/releases/tag/v1.1.0">
    <img src="https://img.shields.io/badge/Schema-v1.1.0-green?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/Status-Stable-blueviolet?style=for-the-badge" />
  <a href="https://github.com/Benefit-Plan-Standard/benefit-plan-schema/releases/tag/v1.2.0-draft.6">
    <img src="https://img.shields.io/badge/Draft-v1.2.0%20draft%206-orange?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/github/license/Benefit-Plan-Standard/benefit-plan-docs?style=for-the-badge" />
</p>

---

## 📘 About the Standard

The **Benefit Plan Standard (BPS)** defines a unified, machine-readable schema for representing health insurance benefit plans across U.S. carriers.  
It provides:

- Canonical field definitions  
- Standardized terminology  
- Cross-carrier vocabulary mapping  
- Schema-level validation rules  
- Extensible modules (pharmacy, behavioral health, dental/vision, supplemental benefits)  
- A normalized data model for analytics, automation, and interoperability  
- A FHIR R4 `InsurancePlan` alignment guide and a converter to the CARIN Digital Insurance Card SBC InsurancePlan profile, with 15 example plans published as FHIR Bundles at https://benefitplanstandard.org/fhir/index.json  
- Importers from the CMS public files: the Marketplace public use files and the Medicare Advantage Plan Benefit Package files  
- The medical MVP technical specification for the CMS Health Tech Ecosystem Real-Time Benefits workgroup  
- Recommended vocabularies (118 canonical benefits, categories, markets, plan types)

The example plans come from Summary of Benefits and Coverage documents, from Medicare Advantage Summary of Benefits documents, and from the CMS public files for the Marketplace and Medicare Advantage.

The current schema release is **v1.1.0** (backward-compatible with v1.0.0); **v1.2.0** is a draft (draft 6), which the two importers write and which becomes final after two independent adopters implement and validate it. See the [changelog](https://benefitplanstandard.org/docs/changelog) for what's new.

All official documentation is published at:

👉 **https://benefitplanstandard.org**

---

## 📁 Repository Purpose

This repository contains the complete **Docusaurus-based documentation website** for the Benefit Plan Standard.

It includes:

- `docs/`: specification, governance, compliance, examples; under `docs/specification/`, the FHIR InsurancePlan page, the two importer pages, the data-flow diagram and the medical MVP page  
- `scripts/`: `generateCrosswalk.js` and `utils.js` (the Google Sheets crosswalk), `fetch-activity.js` (the commit activity snapshot the home page draws), `enrich-sitemap.js` (adds the hand-built pages under `static/` to the sitemap), `directives.js` (the `:::details` block)  
- `static/`: images, the `/why` explainer, and the published copies of the schema (`static/schema/`), the vocabularies (`static/vocabularies/`), the pharmacy module (`static/modules/`) and the FHIR Bundles with their index (`static/fhir/`); these are copied from the schema repository by its `scripts/publish-schema.js` and `scripts/publish-fhir.js`, not edited here  
- `sidebars.js`: sidebar navigation configuration  
- `docusaurus.config.js`: global site configuration  


The **JSON Schema itself** is maintained in a separate repository:

👉 https://github.com/Benefit-Plan-Standard/benefit-plan-schema

---

## 🔄 Automated Crosswalk Pipeline

This documentation includes a GitHub Actions workflow that automatically updates the **Carrier Crosswalk** section of the site.

### The pipeline performs

- Fetching the published Google Sheets crosswalk source  
- Converting each tab into HTML tables  
- Injecting the tables directly into `/docs/specification/crosswalk.md`  
- Running validation to ensure clean formatting  
- Deploying the updated site on every push to `main`; the build also runs `scripts/fetch-activity.js` before and `scripts/enrich-sitemap.js` after Docusaurus  

### Key files

- `scripts/generateCrosswalk.js`
- `scripts/utils.js`
- `.github/workflows/deploy.yml`  

This keeps the carrier crosswalk tables in sync with the working sheet. The medical and pharmacy crosswalk data for the specification pages live beside them as `docs/specification/*-crosswalk-data.json`.

---

## 🏗 Development Workflow

### Install dependencies

```bash
npm install
```

### Run the documentation site locally

```bash
npm start
```

### Build for production

```bash
npm run build
```

### Regenerate the crosswalk tables from Google Sheets

```bash
npm run generate:crosswalk
```

## 🤝 Contributing

Contributions are welcome from carriers, brokers, TPAs, health-tech developers, researchers, and standards organizations.

Please review:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

We encourage community discussions, issue reports, and pull requests that help improve the clarity, accuracy, and usability of the standard.

## 📬 Contact

📧 [contact@benefitplanstandard.org](mailto:contact@benefitplanstandard.org)

🌐 [https://benefitplanstandard.org](https://benefitplanstandard.org)

<!-- Crosswalk re-sync: 2026-05-22 (BPS v1.1 accumulator updates; A4 typo fix in Accumulators tab) -->

