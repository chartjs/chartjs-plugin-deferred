const pkg = require('./package.json');

const banner = `/*!
 * @license
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * (c) 2016-${new Date().getFullYear()} ${pkg.name} contributors
 * Released under the ${pkg.license} license
 */`;

export default {
	input: 'src/plugin.js',
	banner: banner,
	format: 'umd',
	external: [
		'chart.js'
	],
	globals: {
		'chart.js': 'Chart'
	}
};
