// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Benefit Plan Standard',
  tagline: 'An open, vendor-neutral data schema for health benefit plans',
  url: 'https://benefitplanstandard.org',   // Your custom domain
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/img/favicon.svg',
      },
    },
  ],

  // GitHub pages deployment config
  organizationName: 'Benefit-Plan-Standard',  // GitHub org
  projectName: 'benefit-plan-docs',           // Repo
  deploymentBranch: 'gh-pages',               // CRITICAL FIX
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Benefit-Plan-Standard/benefit-plan-docs/edit/main/',
          remarkPlugins: [
            require('remark-directive'),
            require('./scripts/directives.js'),
            require('remark-gfm'),
          ],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],


  themeConfig: {
    image: 'img/og-image.png',
    metadata: [
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'Benefit Plan Standard'},
      {name: 'twitter:description', content: 'An open, vendor-neutral data standard for normalizing and exchanging health benefit plan information.'},
      {property: 'og:type', content: 'website'},
      {property: 'og:title', content: 'Benefit Plan Standard'},
      {property: 'og:description', content: 'An open, vendor-neutral data standard for normalizing and exchanging health benefit plan information.'},
      {property: 'og:url', content: 'https://benefitplanstandard.org'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: 'Benefit Plan Standard',
        src: 'img/logo.svg',
      },
      title: 'Benefit Plan Standard'
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    }
  }
};

module.exports = config;
