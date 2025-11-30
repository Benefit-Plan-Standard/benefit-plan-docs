// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Benefit Plan Standard',
  tagline: 'An open, vendor‑neutral data schema for health benefit plans',
  url: 'https://benefitplanstandard.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Benefit-Plan-Standard', // GitHub org name
  projectName: 'benefit-plan-docs', // Repo name

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */ ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Benefit-Plan-Standard/benefit-plan-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ ({
    navbar: {
      title: 'Benefit Plan Standard',
      logo: {
        alt: 'Benefit Plan Standard Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Benefit-Plan-Standard/benefit-plan-schema',
          label: 'Schema Repo',
          position: 'right',
        },
        {
          href: 'https://github.com/Benefit-Plan-Standard/benefit-plan-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/specification/overview',
            },
            {
              label: 'Field Definitions',
              to: '/docs/specification/field-definitions',
            },
            {
              label: 'Crosswalk',
              to: '/docs/specification/crosswalk',
            },
            {
              label: 'Modules',
              to: '/docs/specification/modules',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/Benefit-Plan-Standard/benefit-plan-docs/discussions',
            },
            {
              label: 'Report Issues',
              href: 'https://github.com/Benefit-Plan-Standard/benefit-plan-schema/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'About',
              to: '/docs/about/team',
            },
            {
              label: 'Governance',
              to: '/docs/governance/mission',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Benefit Plan Standard`,
    },
  }),
};

module.exports = config;