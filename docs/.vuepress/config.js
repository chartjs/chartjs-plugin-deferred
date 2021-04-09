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
	],
	themeConfig: {
		repo: 'chartjs/chartjs-plugin-deferred',
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
				'installation',
				'options',
			],
			'/samples/': [
				'delay.md',
				'offset.md',
			]
		}
	}
};
