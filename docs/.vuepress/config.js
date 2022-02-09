// https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
const BRANCH = process.env.BRANCH || (process.env.NODE_ENV === 'development' ? 'local' : '');
const IS_DEV = BRANCH ? !BRANCH.match(/^v\d\.\d\.\d/) : false;
const REPO_NAME = 'chartjs/chartjs-plugin-deferred';
const REPO_URL = `https://www.github.com/${REPO_NAME}`;
const pkg = require('../../package.json');

module.exports = {
  dest: 'dist/docs',
  theme: 'chartjs',
  title: pkg.name,
  description: pkg.description,
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
  ],
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-99068522-3'
    }],
    ['redirect', {
      redirectors: [
        {base: '/samples', alternative: ['delay']},
        {base: '/', alternative: ['guide/']},
      ],
    }],
    ['@simonbrunel/vuepress-plugin-versions', {
      filters: {
        compat: (major) => +major < 2 ? 2 : 3,
        slug: (v) => v.replace(/\./g, '_'),
        suffix: (v) => v ? ` (${v})` : '',
      },
      menu: {
        text: IS_DEV ? `Development (${BRANCH})` : '{{version}}',
        items: [
          {
            text: 'Documentation',
            items: [
              {
                target: '_self',
                text: 'Development (master)',
                link: 'https://master--chartjs-plugin-deferred.netlify.app/',
              },
              {
                type: 'versions',
                text: '{{major}}.{{minor}}.x - Chart.js v{{major|compat}}',
                link: 'https://v{{version|slug}}--chartjs-plugin-deferred.netlify.app/',
                target: '_self',
                exclude: /^0\./,
                group: 'major',
              },
            ],
          },
          {
            text: 'Release notes',
            items: [
              {
                type: 'versions',
                text: 'v{{version}}{{tag|suffix}}',
                link: `${REPO_URL}/releases/tag/v{{version}}`,
                exclude: /^0\./,
                group: 'major',
              },
              {
                text: 'All releases',
                link: `${REPO_URL}/releases`,
              },
            ],
          },
        ],
      },
    }],
  ],
  themeConfig: {
    repo: REPO_NAME,
    logo: '/favicon.png',
    lastUpdated: 'Last Updated',
    editLinks: true,
    docsDir: 'docs',
    chart: {
      imports: [
        ['scripts/register.js'],
        ['scripts/defaults.js'],
        ['scripts/utils.js', 'Utils'],
      ]
    },
    nav: [
      {text: 'Guide', link: '/guide/'},
      {text: 'Samples', link: '/samples/'},
    ],
    sidebar: {
      '/guide/': [
        '',
        'getting-started',
        'options',
        'migration'
      ],
      '/samples/': [
        'delay.md',
        'offset.md',
      ]
    }
  }
};
