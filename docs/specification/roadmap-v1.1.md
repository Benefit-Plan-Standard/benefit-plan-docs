---
id: roadmap-v1.1
title: v1.1.0 Specification Roadmap
sidebar_label: v1.1 Roadmap
---

# Benefit Plan Standard — v1.1.0 Roadmap

This roadmap outlines the planned enhancements for **Version 1.1.0** of the Benefit Plan Standard.  
While v1.0.0 establishes the core schema for medical benefit plans, v1.1.0 expands the model to additional benefit domains and incorporates community feedback.

The items below represent work currently underway or scheduled for the next release cycle.

---

# 🎯 Goals of the v1.1.0 Release

- Extend the standard beyond core medical benefits  
- Improve coverage of complex accumulators  
- Increase representation of real-world plan structures  
- Add new optional modules  
- Support additional carrier data models  
- Maintain backward compatibility wherever possible  

---

# 🧩 **1. Pharmacy Benefits Module (v1.1-PHARM)**

**Status:** Drafting → Public review in progress  
**Target:** v1.1.0

### Purpose
Add a comprehensive representation of outpatient pharmacy benefits, including:

- Formulary tiers (e.g., Generic, Preferred Brand, Specialty)  
- Retail vs. Mail Order  
- 30-day vs. 90-day supply  
- Rx deductibles and out-of-pocket maximums  
- Copay vs. coinsurance structures  
- Prior authorization rules  
- Quantity limits & step therapy indicators  

### Schema Additions
- `pharmacy.tiers[]`
- `pharmacy.cost_shares[]`
- `pharmacy.supply_limits`
- `pharmacy.conditions[]`

### Crosswalk Enhancements
- CVS/Caremark  
- Express Scripts  
- OptumRx  

---

# 🧠 **2. Behavioral Health Module (v1.1-BH)**

**Status:** Draft outline  
**Target:** v1.1.0 or v1.2.0 (depending on complexity)

### Purpose
Capture unique rules in mental health and substance use disorder benefits:

- Tele-behavioral visit rules  
- Different copays for therapy vs. psychiatry  
- Visit limits (per year, per condition)  
- Medication-assisted therapy (MAT) coverage  

### Schema Additions
- `behavioral_health.services[]`
- `behavioral_health.limits[]`
- `behavioral_health.conditions[]`

---

# 😁 **3. Dental & Vision Modules (v1.1-DENTAL & v1.1-VISION)**

**Status:** Concept stage  
**Target:** v1.1.0

### Purpose
Support common employer and Medicare Advantage benefit packages.

### Dental Fields
- Annual maximum  
- Preventive / Basic / Major coverage  
- Orthodontia  
- Waiting periods  

### Vision Fields
- Exams  
- Frames  
- Lenses  
- Contact lens allowance  

---

# 🏥 **4. Telehealth Module (v1.1-TELEHEALTH)**

**Status:** Community request  
**Target:** v1.1.0

### Purpose
Formalize virtual care benefit structures:

- Virtual PCP visits  
- Virtual urgent care  
- Remote patient monitoring  
- Virtual behavioral health  

### Schema Additions
- `telehealth.services[]`
- `telehealth.cost_shares[]`

---

# ➕ **5. Supplemental Benefits Module (v1.1-SUPP)**

**Status:** Pending  
**Target:** v1.1.0 or v1.2.0

### Includes
- Over-the-counter (OTC) allowances  
- Transportation  
- Meal delivery  
- Fitness benefits  
- Hearing aids  

---

# 🔄 **6. Accumulator Groups Enhancements**

**Status:** In progress  
**Purpose:** Support complex accumulator structures used by major carriers.

Additions may include:

- Multiple medical deductibles  
- Combined Rx + medical accumulators  
- Cross-tier accumulator linking  
- Family vs. member tracking flags  

---

# ⚙️ **7. Crosswalk Expansion**

**Status:** In progress

New carriers to be added:

- Aetna  
- Anthem  
- Kaiser  
- Ambetter  
- Oscar  
- Medicare Advantage regional plans  

This improves ingestion accuracy across the ecosystem.

---

# 🔧 **8. Backward Compatibility & Migration Guidance**

v1.1 will include:

- A migration table from v1.0 → v1.1  
- Deprecated fields  
- New optional modules  
- Validation rules for hybrid plans  

Backward compatibility is a core principle.  
No breaking changes will be introduced without clear migration paths.

---

# 🗓️ **Planned Timeline (Tentative)**

| Quarter | Release Item |
|--------|--------------|
| Q2 2025 | Public review drafts for Pharmacy & Dental |
| Q3 2025 | Crosswalk expansion; Telehealth module |
| Q4 2025 | v1.1.0 Candidate Release |
| Q1 2026 | v1.1.0 Final Release & Certification update |

---

# 🙋 How to Contribute

- Join the discussions on GitHub  
- Submit feedback via Issues  
- Participate in module workgroups  
- Provide real plan examples for module testing  

---

# 📢 Notes

This roadmap reflects the **technical direction** of the specification.  
For organizational goals and governance planning, see:

👉 `/docs/governance/roadmap.md`

