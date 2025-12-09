# 🌐 Benefit Plan Standard — Documentation  
The official documentation site for the open, vendor-neutral data standard for representing U.S. health insurance benefit plans.

<p align="left">
  <a href="https://benefitplanstandard.org">
    <img src="https://img.shields.io/badge/Documentation-Live-blue?style=for-the-badge" />
  </a>
  <a href="https://github.com/Benefit-Plan-Standard/benefit-plan-schema">
    <img src="https://img.shields.io/badge/Schema-v1.0.0-green?style=for-the-badge" />
  </a>
  <img src="https://img.shields.io/badge/Status-Active_Development-purple?style=for-the-badge" />
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

Supported plan types include SBCs, EOCs, ACA plans, employer group plans, Medicare Advantage, and more.

All official documentation is published at:

👉 **https://benefitplanstandard.org**

---

## 📁 Repository Purpose

This repository contains the complete **Docusaurus-based documentation website** for the Benefit Plan Standard.

It includes:

- `docs/` — Specification, governance, compliance, examples
- `scripts/` — Automation scripts (Google Sheets → HTML crosswalk)
- `static/` — images, assets, CNAME  
- `sidebars.js` - Sidebar navigation configuration
- `docusaurus.config.js` — Global site configuration


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
- Deploying the updated site on every push  

### Key files

- `scripts/generateCrosswalk.js`
- `scripts/utils.js`
- `.github/workflows/deploy.yml`  

This ensures the crosswalk tables remain accurate and always in sync with the working standard.

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
