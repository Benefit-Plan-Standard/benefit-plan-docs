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
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: 'Benefit Plan Standard',
        src: 'img/logo.png',
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
