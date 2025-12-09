/**
 * Full directive support for :::details blocks in Docusaurus.
 * This plugin transforms :::details directives (parsed by remark-directive)
 * into HTML <details> elements.
 */

const { visit } = require('unist-util-visit');

module.exports = function detailsDirective() {
  return (tree) => {
    // Transform :::details into real <details> components
    // Note: remark-directive must be loaded AFTER this plugin to parse directives first
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'details') {

        const data = (node.data ||= {});
        const label =
          node.label ||
          node.attributes?.title ||
          "Details";

        data.hName = "details";
        data.hProperties = {
          open: false,
          class: "crosswalk-details"
        };

        // Insert <summary>
        node.children.unshift({
          type: "paragraph",
          data: { hName: "summary" },
          children: [{ type: "text", value: label }]
        });
      }
    });

  };
};
