/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * For more information, see:
 * https://docusaurus.io/docs/api/sidebar
 */

module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Specification',
      collapsible: true,
      collapsed: false,
      items: [
        'specification/overview',
        'specification/field-definitions',
        'specification/crosswalk',
        'specification/modules',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      items: [
        'getting-started/installation',
        'getting-started/examples',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      collapsible: true,
      collapsed: false,
      items: [
        // NEW GOVERNANCE PAGES (in sidebar_position order)
        'governance/governance-overview',
        'governance/versioning-release-policy',
        'governance/contribution-process',

        // EXISTING GOVERNANCE PAGES
        'governance/mission',
        'governance/roadmap',
        'governance/faq',
      ],
    },
    {
      type: 'category',
      label: 'About',
      collapsible: true,
      items: [
        'about/team',
        'about/contact',
        'about/acknowledgements',
      ],
    },
  ],
};
