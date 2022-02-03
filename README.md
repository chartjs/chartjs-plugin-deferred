<div align="center">
  <img src="docs/assets/banner.png"/>
</div>

[![github](https://img.shields.io/github/release/chartjs/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://github.com/chartjs/chartjs-plugin-deferred/releases/latest) [![travis](https://img.shields.io/travis/chartjs/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://travis-ci.org/chartjs/chartjs-plugin-deferred) [![codeclimate](https://img.shields.io/codeclimate/maintainability/chartjs/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://codeclimate.com/github/chartjs/chartjs-plugin-deferred)

[Chart.js](https://www.chartjs.org/) plugin to defer initial chart updates until the user scrolls and the canvas appears inside the viewport, and thus trigger the initial chart animations when the user is likely to see them.

Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **3.x**.

## Documentation

- [Introduction](https://chartjs-plugin-deferred.netlify.app/)
- [Getting Started](https://chartjs-plugin-deferred.netlify.app/getting-started.html)
- [Options](https://chartjs-plugin-deferred.netlify.app/options.html)
- [Samples](https://chartjs-plugin-deferred.netlify.app/samples/)

## Example

```javascript
new Chart(ctx, {
  // ... data ...
  options: {
    // ... other options ...
    plugins: {
      deferred: {
        xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
        yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
        delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
      }
    }
  }
});
```

## Development

You first need to install node dependencies (requires [Node.js](https://nodejs.org/)):

```sh
> npm install
```

The following commands will then be available from the repository root:

```sh
> npm run build             // build dist files
> npm run build:dev         // build and watch for changes
> npm run lint              // perform code linting
> npm run lint -- --fix     // automatically fix linting problems
> npm run docs              // generate documentation (`dist/docs`)
> npm run docs:dev          // generate documentation and watch for changes
> npm run package           // create tgz and zip archives with dist files
```

## License

`chartjs-plugin-deferred` is available under the [MIT license](LICENSE.md).
