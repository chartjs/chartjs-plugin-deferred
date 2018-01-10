# Defer initial chart updates

[![npm](https://img.shields.io/npm/v/chartjs-plugin-deferred.svg?style=flat-square)](https://npmjs.com/package/chartjs-plugin-deferred) [![bower](https://img.shields.io/bower/v/chartjs-plugin-deferred.svg?style=flat-square)](https://libraries.io/bower/chartjs-plugin-deferred) [![travis](https://img.shields.io/travis/chartjs/chartjs-plugin-deferred.svg?style=flat-square)](https://travis-ci.org/chartjs/chartjs-plugin-deferred) [![codeclimate](https://img.shields.io/codeclimate/maintainability/chartjs/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://codeclimate.com/github/chartjs/chartjs-plugin-deferred)

[Chart.js](http://www.chartjs.org/) plugin to defer initial chart updates until the user scrolls and the canvas appears inside the viewport, and thus trigger the initial chart animations when the user is likely to see them.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **2.6.0** or later.

## Usage

You can download the latest version of [chartjs-plugin-deferred on GitHub](https://github.com/chartjs/chartjs-plugin-deferred/releases/latest)

## Configuration

To configure this plugin, you can simply add the following entries to your chart options:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `plugins.deferred` | `Object/Boolean` | `true` | The deferred options (see `plugins.deferred.*` options). Also accepts a boolean, in which case if `true`, the chart will be deferred using the **global options**, else if `false`, the chart will not be deferred.
| `plugins.deferred.xOffset` | `Number/String` | `0` | Number of pixels (or percent of the canvas width) from which the chart is considered inside the viewport.
| `plugins.deferred.yOffset` | `Number/String` | `0` | Number of pixels (or percent of the canvas height) from which the chart is considered inside the viewport.
| `plugins.deferred.delay` | `Number` | `0` | Number of milliseconds to delay the loading after the chart is considered inside the viewport.

> **Global options** can be change through `Chart.defaults.global.plugins.deferred`, which by default defer the chart loading until the first line of pixels of the canvas appears in the viewport.

For example:

```
{
    plugins: {
        deferred: {           // enabled by default
            xOffset: 150,     // defer until 150px of the canvas width are inside the viewport
            yOffset: '50%',   // defer until 50% of the canvas height are inside the viewport
            delay: 500        // delay of 500 ms after the canvas is considered inside the viewport
        }
    }
}
```

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```shell
> npm install
```

The following commands will then be available from the repository root:

```shell
> gulp build            // build dist files
> gulp build --watch    // build and watch for changes
> gulp lint             // perform code linting
> gulp package          // create an archive with dist files and samples
```

## License

chartjs-plugin-deferred is available under the [MIT license](LICENSE.md).
