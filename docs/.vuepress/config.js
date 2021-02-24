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
	],
	themeConfig: {
		repo: 'chartjs/chartjs-plugin-deferred',
		logo: '/favicon.png',
		lastUpdated: 'Last Updated',
		editLinks: true,
		docsDir: 'docs',
		nav: [
			{text: 'Guide', link: '/'},
			{text: 'Samples', link: 'https://chartjs-plugin-deferred.netlify.com/samples/'},
		],
		sidebar: [
			'',
			'installation',
			'options',
		],
	}
};
