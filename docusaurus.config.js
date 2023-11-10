// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Miking',
  tagline: 'A framework for constructing efficient domain-specific languages.',
  url: 'http://miking.org/',
  baseUrl: '/',
  projectName: 'miking-lang.github.io',
  organizationName: 'miking-lang',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  // TODO We should eventually fix broken links and throw if any are found
  // onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      navbar: {
        title: 'Miking',
        // TODO Add Miking logo
        // logo: {
        //   alt: 'Miking Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          //{
          //  to: 'install',
          //  position: 'left',
          //  label: 'Install',
          //},
          {
            type: 'doc',
            docId: 'root',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: 'publications',
            position: 'left',
            label: 'Publications',
          },
          {
            to: 'workshop-2023',
            position: 'left',
            label: 'Workshop 2023',
          },
          {
            href: 'https://github.com/miking-lang/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/tutorials',
              },
              {
                label: 'How-to Guides',
                to: '/docs/how-to-guides',
              },
              {
                label: 'Reference',
                to: '/docs/reference',
              },
              {
                label: 'Explanations',
                to: '/docs/explanations',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/miking-lang/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} David Broman`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
