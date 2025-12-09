import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

/* SVG Icon Components (clean, modern, dark-theme compatible) */
function IconNormalize() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="4" height="10" rx="1.5" fill="#38bdf8" />
      <rect x="10" y="6" width="4" height="14" rx="1.5" fill="#0ea5e9" />
      <rect x="17" y="3" width="4" height="17" rx="1.5" fill="#22c55e" />
    </svg>
  );
}

function IconInteroperability() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 7a4 4 0 0 1 5.66 0l1.41 1.41a4 4 0 0 1 0 5.66L13 16.83"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 17a4 4 0 0 1-5.66 0L9.93 15.59a4 4 0 0 1 0-5.66L11 8.17"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExtensible() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h4l1 2h4v4l2 1v4l-2 1v4h-4l-1 2H7v-4l-2-1v-4l2-1V5l2-1z"
        fill="#7c3aed"
      />
    </svg>
  );
}

/* Feature Component */
function Feature({ Icon, title, description }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIconWrapper}>
        <Icon className={styles.featureIcon} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Benefit Plan Standard"
      description="An open, vendor-neutral data standard for normalizing and exchanging health benefit plan information."
    >
      {/* Hero banner */}
      <header className={styles.heroBanner}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Benefit Plan Standard</h1>

          <p className={styles.heroSubtitle}>
            Open, vendor-neutral schema for health benefit plans. Normalize data,
            enable interoperability, and extend with custom modules.
          </p>

          {/* CTA Buttons */}
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/specification/overview"
            >
              Read the Specification
            </Link>

            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started/installation"
            >
              Get Started
            </Link>

            <Link
              className="button button--info button--lg"
              to="https://github.com/Benefit-Plan-Standard/benefit-plan-schema"
              external
            >
              View Schema on GitHub
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Key features */}
        <section className={styles.featuresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Key Features</h2>

            <div className={styles.featuresGrid}>
              <Feature
                Icon={IconNormalize}
                title="Normalize Benefit Data"
                description="Eliminate manual extraction and reconcile differences across carriers with a unified schema that defines every field, limit and cost share."
              />

              <Feature
                Icon={IconInteroperability}
                title="Enable Interoperability"
                description="Use a common language to compare plans, build analytics and integrate systems—from brokers and TPAs to digital health platforms."
              />

              <Feature
                Icon={IconExtensible}
                title="Modular & Extensible"
                description="Extend the core schema with modules for pharmacy, behavioral health, dental, vision and more. Grow without breaking your integrations."
              />
            </div>
          </div>
        </section>

        {/* Why section */}
        <section className={styles.whySection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Benefit Plan Standard?</h2>
            <ul className={styles.whyList}>
              <li>Unlock comparability across carriers to empower transparent plan selection.</li>
              <li>Reduce extraction costs and time by relying on a single canonical schema.</li>
              <li>Enable analytics, decision support and interoperability with clean, machine-readable data.</li>
              <li>Facilitate regulatory compliance and simplify integrations across the benefits ecosystem.</li>
            </ul>
          </div>
        </section>

        {/* Getting started */}
        <section className={styles.getStartedSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Get Started</h2>
            <p className={styles.getStartedLead}>
              Begin your journey with the Benefit Plan Standard in just three steps:
            </p>

            <ol className={styles.getStartedList}>
              <li>
                Read the <Link to="/docs/specification/overview">Specification Overview</Link>.
              </li>
              <li>
                Explore <Link to="/docs/getting-started/examples">sample plan files</Link>.
              </li>
              <li>
                Install and implement the schema using our <Link to="/docs/getting-started/installation">installation guide</Link>.
              </li>
            </ol>
          </div>
        </section>

        {/* Community */}
        <section className={styles.communitySection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Community</h2>

            <p className={styles.communityText}>
              Benefit Plan Standard thrives on collaboration. Contribute to the schema,
              discuss enhancements, and help define the future of benefits interoperability.
              Connect with us on GitHub or follow us on LinkedIn for updates.
            </p>

            <div className={styles.communityButtons}>
              <Link
                className="button button--primary"
                to="https://github.com/Benefit-Plan-Standard"
                external
              >
                GitHub Organization
              </Link>

              <Link
                className="button button--secondary"
                to="https://www.linkedin.com/company/benefit-plan-standard"
                external
              >
                LinkedIn Page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
