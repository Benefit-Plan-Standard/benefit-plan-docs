import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// Import our scoped CSS module.  If you change this filename,
// make sure to update the import accordingly.
import styles from './index.module.css';

// Import the feature images from the static assets folder.  These
// images live in `static/img` at the root of the docs project and
// are copied to the build output automatically.  Feel free to
// substitute your own icons or artwork by adding files there and
// updating these import paths.
import normalizeImg from '@site/static/img/normalize.png';
import interoperabilityImg from '@site/static/img/interoperability.png';
import extensibleImg from '@site/static/img/extensible.png';

/**
 * A reusable tile component for the key features section.  Each
 * Feature accepts an image, a title and a description.  The layout
 * and spacing are controlled via the accompanying CSS module.
 */
function Feature({ image, title, description }) {
  return (
    <div className={styles.featureItem}>
      <img className={styles.featureImage} src={image} alt={title} />
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

/**
 * The primary home page for Benefit Plan Standard.  This component
 * composes a hero section, a set of key features, and additional
 * informational sections to explain why the standard exists, how
 * to get started, and where to engage with the community.  The
 * content is intentionally compact and focused on high‑level
 * messaging; detailed guides and specifications live in the docs.
 */
export default function Home() {
  return (
    <Layout
      title="Benefit Plan Standard"
      description="An open, vendor‑neutral data standard for normalizing and exchanging health benefit plan information."
    >
      {/* Hero banner */}
      <header className={styles.heroBanner}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Benefit Plan Standard</h1>
          <p className={styles.heroSubtitle}>
            Open, vendor‑neutral schema for health benefit plans.  Normalize data,
            enable interoperability, and extend with custom modules.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/specification/overview">
              Read the Specification
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/getting-started/installation">
              Get Started
            </Link>
            <Link className="button button--info button--lg" to="https://github.com/Benefit-Plan-Standard/benefit-plan-schema" external>
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
                image={normalizeImg}
                title="Normalize Benefit Data"
                description="Eliminate manual extraction and reconcile differences across carriers with a unified schema that defines every field, limit and cost share."
              />
              <Feature
                image={interoperabilityImg}
                title="Enable Interoperability"
                description="Use a common language to compare plans, build analytics and integrate systems—from brokers and TPAs to digital health platforms."
              />
              <Feature
                image={extensibleImg}
                title="Modular & Extensible"
                description="Extend the core schema with modules for pharmacy, behavioral health, dental, vision and more.  Grow without breaking your integrations."
              />
            </div>
          </div>
        </section>

        {/* Why the standard exists */}
        <section className={styles.whySection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Benefit Plan Standard?</h2>
            <ul className={styles.whyList}>
              <li>Unlock comparability across carriers to empower transparent plan selection.</li>
              <li>Reduce extraction costs and time by relying on a single canonical schema.</li>
              <li>Enable analytics, decision support and interoperability with clean, machine‑readable data.</li>
              <li>Facilitate regulatory compliance and simplify integrations across the benefits ecosystem.</li>
            </ul>
          </div>
        </section>

        {/* Getting started guide */}
        <section className={styles.getStartedSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Get Started</h2>
            <p className={styles.getStartedLead}>Begin your journey with the Benefit Plan Standard in just three steps:</p>
            <ol className={styles.getStartedList}>
              <li>Read the <Link to="/docs/specification/overview">Specification Overview</Link> to understand the core concepts.</li>
              <li>Explore <Link to="/docs/getting-started/examples">sample plan files</Link> to see the schema in practice.</li>
              <li>Install and implement the schema using our <Link to="/docs/getting-started/installation">installation guide</Link>.</li>
            </ol>
          </div>
        </section>

        {/* Community / Engagement */}
        <section className={styles.communitySection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Community</h2>
            <p className={styles.communityText}>
              Benefit Plan Standard thrives on collaboration.  Contribute to the
              schema, discuss enhancements, and help define the future of benefits
              interoperability.  Connect with us on GitHub or follow us on
              LinkedIn for updates.
            </p>
            <div className={styles.communityButtons}>
              <Link className="button button--primary" to="https://github.com/Benefit-Plan-Standard" external>
                GitHub Organization
              </Link>
              <Link className="button button--secondary" to="https://www.linkedin.com/company/benefit-plan-standard" external>
                LinkedIn Page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}