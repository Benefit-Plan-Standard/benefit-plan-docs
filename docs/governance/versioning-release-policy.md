---
id: versioning-release-policy
title: Versioning & Release Policy
sidebar_position: 6
---

# Versioning & Release Policy

To provide stability while encouraging innovation, Benefit Plan Standard uses a formal versioning and release strategy based on [Semantic Versioning](https://semver.org/).  Each version conveys the scope and impact of changes, enabling implementers to manage upgrades with confidence.

## Version Number Format

The schema version follows the format **MAJOR.MINOR.PATCH**, for example `1.0.0`.

- **MAJOR** — Increments when backwards‑incompatible changes are introduced (e.g., renaming or removing fields).  These changes may require updates to ingestion pipelines and databases.
- **MINOR** — Increments when new fields, modules, or optional features are added in a backwards‑compatible manner.  Existing integrations continue to function without modification.
- **PATCH** — Increments when clarifications or bug fixes are made that do not alter the schema structure or semantics.  These typically involve documentation updates, typo corrections, or additional examples.

## Release Cadence

The Working Group plans quarterly **Minor** releases and yearly **Major** releases, subject to demand.  **Patch** releases occur as needed.  A pre‑release branch (e.g., `next`) hosts draft work for the upcoming version.

### Drafts and Candidate Releases

Before a release becomes final, it is published as a **Release Candidate** (e.g., `1.1.0-rc.1`).  Stakeholders have a two‑week review period to raise issues.  Candidate releases may be updated with additional release candidates if necessary.

## Backwards Compatibility Policy

- Removing or renaming existing normalized fields is **not permitted** in Minor or Patch releases.  Such changes require a Major release.
- Adding new fields with default values or optional modules is permitted in Minor releases.
- Changing default values or altering semantics requires a Major release.

## Deprecation

When a field or module becomes obsolete, it is marked as **deprecated** in the documentation and maintained for at least one Major version.  Implementers are advised to migrate to the recommended alternative before the deprecated element is removed in a future Major release.

## Release Notes & Changelog

Every release includes detailed release notes summarizing:

- New features and modules
- Breaking changes (Major releases only)
- Deprecations and removals
- Bug fixes and clarifications
- Migration guidance

See the [Changelog](/docs/changelog) for a chronological list of releases.

---
