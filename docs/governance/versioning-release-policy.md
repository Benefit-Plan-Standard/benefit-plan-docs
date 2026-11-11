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

## Drafts and Releases

The release rule is the one in the schema repository's [governance document](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/docs/governance.md), under Releases:

1. Draft versions are published for community testing and feedback. Each published draft is a git tag on the schema repository, `vX.Y.Z-draft.N` (for 1.2.0, `v1.2.0-draft.1` through `v1.2.0-draft.9`), so any draft can be checked out by its tag.
2. A final release requires successful implementation and validation by at least 2 independent adopters. Adopters are recorded in the [adopters file](https://github.com/Benefit-Plan-Standard/benefit-plan-schema/blob/main/ADOPTERS.md), each with its evidence and whether it is independent of the maintainer.
3. Release notes summarize changes and provide migration guidance.

There is no release candidate stage, and no release has been issued as a candidate. Releases have no fixed calendar: a version is released when its draft meets the rule above. **Patch** releases are made as needed.

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
