---
id: contribution-process
title: Contribution Process
sidebar_position: 5
---

# Contribution Process

We welcome contributions of all kinds—new modules, schema enhancements, documentation updates, bug reports, and example plans.  This guide outlines how to contribute effectively.

## Ways to Contribute

- **Raise an Issue:** Identify inconsistencies, suggest improvements, or report defects by opening a GitHub issue in the [benefit-plan-schema](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/issues) or [benefit-plan-docs](https://github.com/Benefit-Plan-Standard/benefit-plan-docs/issues) repositories.
- **Propose Changes:** Use a pull request (PR) to submit changes to the schema or documentation.  Each PR should address a single topic and include relevant tests or examples.
- **Review:** Comment on issues and PRs to share feedback, ask questions, and build consensus.
- **Add Examples:** Normalize plans from additional carriers and contribute sample JSON files to the examples repository.

## Workflow for Pull Requests

1. **Fork & Clone:** Fork the repository (schema or docs) and clone it locally.
2. **Create a Branch:** Create a descriptive feature branch (e.g., `feat/add-unlimited-visits-limit`).
3. **Make Changes:** Update the schema (`*.json`), crosswalk, examples, or documentation as needed.  Ensure you run any provided linter or test scripts.
4. **Write Tests & Docs:** If adding new fields or modules, provide examples and update the field definitions and crosswalk accordingly.
5. **Commit & Push:** Commit your changes with a clear message and push your branch to your fork.
6. **Open a PR:** Submit a pull request to the `main` branch of the appropriate repository.  Link relevant issues and describe your changes.
7. **Address Feedback:** Participate in the review process, making updates as requested.  Editors and Working Group members will provide guidance.
8. **Merge & Release:** Once approved, your changes will be merged into `main` (for documentation) or `next` (for schema).  They will appear in the next scheduled release.

## Guidelines

- **Scope:** Keep pull requests focused.  Avoid combining unrelated changes.
- **Clarity:** Provide context for your change.  Explain why it is needed and any implications for existing integrators.
- **Backward Compatibility:** Default to additive changes.  Breaking changes require Working Group approval and a Major version increment.
- **Licensing:** All contributions must be made under the project’s open source licenses (MIT for code, CC BY for documentation).  Contributors affirm they have the right to submit the work.

## Communication Channels

- **GitHub Discussions:** Use the [discussions](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/discussions) feature for general questions, brainstorming, and RFCs.
- **Working Group Calls:** Attend monthly governance calls for real‑time discussion and decision making.  Agendas and notes are posted publicly.
- **Slack or Mailing List:** Stay informed and engage with the community via the designated chat or mailing list (details forthcoming).

## Attribution

We recognize contributors in release notes and, where appropriate, on the project website.  Thank you for helping improve the Benefit Plan Standard!

---
