/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Mongez React: A Comprehensive React JS Framework',
  tagline: 'Rapid Project Builder',
  url: 'https://docs.mentoor.io/mongez-react',
  baseUrl: '/mongez-react/',
  onBrokenLinks: 'throw',
  themes: ['@docusaurus/theme-live-codeblock'],
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/mongez-react.png',
  organizationName: 'Mentoor', // Usually your GitHub org/user name.
  projectName: 'mongez-react', // Usually your repo name.
  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
      // darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: 'Mongez React',
      logo: {
        alt: 'Mongez React',
        src: 'img/mongez-react.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started/introduction',
          position: 'left',
          label: 'Docs',
        },
        // {to:z '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/hassanzohdy/mongez-react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Tutorial',
      //         to: '/docs/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'Twitter',
      //         href: 'https://twitter.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: '/blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      // copyright: `Copyright © ${new Date().getFullYear()} Mentoor, Inc. Built with Docusaurus.`,
      copyright: `Copyright © ${new Date().getFullYear()} Mentoor, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
