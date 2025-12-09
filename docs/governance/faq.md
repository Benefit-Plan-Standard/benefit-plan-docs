---
id: faq
title: Frequently Asked Questions
sidebar_position: 4
---

# Frequently Asked Questions (FAQ)

## Why create a new standard?

Health benefit plans are currently documented in inconsistent formats, making automated comparison and analytics extremely difficult.  An open standard provides a single, interoperable format that any carrier or vendor can adopt.  Similar to how FHIR unified clinical data exchange, the Benefit Plan Standard aims to unify benefit plan data.

## Is the standard free to use?

Yes.  The specification, schema, and documentation are published under an open license.  You may use, implement, and adapt the standard at no cost.  Commercial products may be built on top of the standard.

## Who governs the standard?

The standard is maintained by an independent committee.  See [Mission & Governance](mission.md) for details.  As adoption grows, additional stakeholders will be invited to participate.

## How do I propose a change?

All changes are discussed publicly on GitHub.  Open an issue in the relevant repository (`benefit-plan-schema` for schema changes, `benefit-plan-docs` for documentation changes).  For major changes, start a discussion and submit a formal proposal.

## What versions will be supported?

The standard follows semantic versioning.  Breaking changes increment the major version.  Minor versions add new optional fields or modules.  Patch versions fix errors or clarify documentation.  See the [Schema Changelog](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/changelog.md) for release history.

## Can carriers adopt part of the standard?

Yes.  A carrier may adopt the core schema without modules.  Modules are optional and build on the core.  However, carriers are encouraged to adopt all applicable modules for complete interoperability.

## How is this different from other standards like X12 or HL7?

X12 and HL7 address claims, enrollment and clinical data.  They do not define benefit plan design in a normalized machine‑readable format.  The Benefit Plan Standard fills that gap by focusing on plan design and cost sharing structures.

## Where can I get help?

You can join our GitHub Discussions forum to ask questions, share feedback, or get help with implementation.  For private or legal inquiries, email the governing committee at [contact@benefitplanstandard.org](mailto:contact@benefitplanstandard.org).
