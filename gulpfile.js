var gulp = require('gulp');
var file = require('gulp-file');
var zip = require('gulp-zip');
var merge = require('merge2');
var path = require('path');
var {exec} = require('child_process');
var pkg = require('./package.json');

var argv = require('yargs')
	.option('output', {alias: 'o', default: 'dist'})
	.argv;

gulp.task('build', () => exec(`npm run build${argv.watch ? ':dev' : ''}`));

gulp.task('package', gulp.series(gulp.parallel('build'), function() {
	var out = argv.output;
	var streams = merge(
		gulp.src([path.join(out, '*.js'), 'LICENSE.md'])
	);

	return streams
		.pipe(zip(pkg.name + '.zip'))
		.pipe(gulp.dest(out));
}));

gulp.task('bower', function() {
	var json = JSON.stringify({
		name: pkg.name,
		description: pkg.description,
		homepage: pkg.homepage,
		license: pkg.license,
		version: pkg.version,
		main: argv.output + pkg.name + '.js'
	}, null, 2);

	return file('bower.json', json, {src: true})
		.pipe(gulp.dest('./'));
});
