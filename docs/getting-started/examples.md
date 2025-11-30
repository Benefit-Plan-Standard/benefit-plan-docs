---
id: examples
title: Examples
sidebar_position: 2
---

# Examples

This page showcases example normalized plan files and explains how to interpret them.  These examples correspond to real carrier plans that have been converted into the Benefit Plan Standard.

## Example: Blue Cross PPO

You can view a normalized Blue Cross plan in the schema repository under `examples/bluecross_example.json`.  It illustrates how deductibles, copays, coinsurance, network tiers, and limits are represented in a single JSON object.

Key features:

- Multiple tiers (`IN`, `OUT`) with different cost shares
- Separate plan‑wide deductible and OOP maximum
- Limit objects for rehabilitation services (e.g., 25 visits per year)
- Conditions for prior authorization on certain imaging services
- Source references pointing back to the SBC

## Example: Humana Medicare Advantage

The `examples/humana_example.json` file shows how a Medicare Advantage plan is encoded:

- Many services have $0 copay because MA plans typically cover preventive services fully
- A pharmacy deductible applies only to tiers 3–5
- Worldwide emergency coverage is captured with a separate tier and MOOP exclusion flag
- Supplemental benefits such as hearing and vision are represented as additional benefit items

## Example: UnitedHealthcare HMO

In `examples/united_example.json` you’ll find a commercial HMO plan with:

- Flat copays for physician visits and urgent care
- Tier‑specific deductibles for in‑network and out‑of‑network providers
- Combined annual visit caps for therapies
- Conditions requiring referrals for specialist visits

## How to Explore Examples

To inspect any example plan:

1. Clone the schema repository: `git clone https://github.com/Benefit-Plan-Standard/benefit-plan-schema`
2. Open one of the JSON files in the `examples/` directory.
3. Compare the fields to the [Field Definitions](/docs/specification/field-definitions) to understand their meaning.
4. Validate the JSON using a schema validator (see [Installation & Usage](/docs/getting-started/installation)).

These examples serve as a practical guide for developers and analysts.  As more carriers are normalized, new examples will be added.
