# Contributing to Benefit Plan Standard

Thank you for considering a contribution to the Benefit Plan Standard. We welcome your ideas, bug reports, and improvements to the schema, documentation, and tooling. This project aims to provide an open, vendor‑neutral way to represent health benefit plan data, and contributions from the community are critical to its success.

## How to Contribute

### 1. Fork the Repository

Use the GitHub web interface to fork the appropriate repository (`benefit-plan-schema` or `benefit-plan-docs`) to your own GitHub account.

### 2. Create a Branch

Create a feature branch off of `main` in your fork using a descriptive name:

```
git checkout -b fix/crosswalk-typo
```

### 3. Make Your Changes

* For schema updates, modify the JSON Schema in `schema/` and update any examples or documentation that reference the changed fields.
* For documentation changes, edit the Markdown files under `docs/` or `website/`.
* For bug fixes or new features, write clear and concise code and include appropriate tests if applicable.

### 4. Run Tests and Lint

Before submitting a pull request, run the test suite and linter (if available) to ensure your changes do not break existing functionality.

### 5. Commit and Push

Use clear commit messages that describe what your change does and why:

```
git add .
git commit -m "Fix crosswalk typo in specialist benefit"
git push origin fix/crosswalk-typo
```

### 6. Submit a Pull Request

Open a pull request against the `main` branch of this repository. Include a description of the changes, the rationale behind them, and any relevant issue numbers. The project maintainers will review your PR and provide feedback.

## Reporting Issues

If you encounter a bug or have a suggestion, please open an issue using the appropriate template. Include as much detail as possible, including steps to reproduce the issue and the environment in which it occurs.

## Contributor License Agreement

By contributing to this project you agree to license your contributions under the project’s license. See `LICENSE` in the repository for more information.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

We appreciate your contributions and look forward to collaborating with you!