# Getting Started

## Installation

### npm

[![npm](https://img.shields.io/npm/v/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://npmjs.com/package/chartjs-plugin-deferred) [![npm downloads](https://img.shields.io/npm/dm/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://npmjs.com/package/chartjs-plugin-deferred)

```sh
npm install chartjs-plugin-deferred --save
```

### Bower

[![bower](https://img.shields.io/bower/v/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://libraries.io/bower/chartjs-plugin-deferred)

```sh
bower install chartjs-plugin-deferred --save
```

### CDN

[![jsdelivr](https://img.shields.io/npm/v/chartjs-plugin-deferred.svg?label=jsdelivr&style=flat-square&maxAge=600)](https://cdn.jsdelivr.net/npm/chartjs-plugin-deferred@latest/dist/) [![jsdelivr hits](https://data.jsdelivr.com/v1/package/npm/chartjs-plugin-deferred/badge)](https://www.jsdelivr.com/package/npm/chartjs-plugin-deferred)

By default, `https://cdn.jsdelivr.net/npm/chartjs-plugin-deferred` returns the latest (minified) version, however it's [**highly recommended**](https://www.jsdelivr.com/features) to always specify a version in order to avoid breaking changes. This can be achieved by appending `@{version}` to the url:

```sh
https://cdn.jsdelivr.net/npm/chartjs-plugin-deferred@2.0.0    // exact version
https://cdn.jsdelivr.net/npm/chartjs-plugin-deferred@2        // latest 2.x.x
```

Read more about jsDeliver versioning on their [website](https://www.jsdelivr.com/).

### Download

[![github](https://img.shields.io/github/release/chartjs/chartjs-plugin-deferred.svg?style=flat-square&maxAge=600)](https://github.com/chartjs/chartjs-plugin-deferred/releases/latest) [![github downloads](https://img.shields.io/github/downloads/chartjs/chartjs-plugin-deferred/total.svg?style=flat-square&maxAge=600)](https://somsubhra.github.io/github-release-stats/?username=chartjs&repository=chartjs-plugin-deferred)

You can download the latest version of `chartjs-plugin-deferred` from the [GitHub releases](https://github.com/chartjs/chartjs-plugin-deferred/releases/latest):

- `chartjs-plugin-deferred.js` (recommended for development)
- `chartjs-plugin-deferred.min.js` (recommended for production)
- `chartjs-plugin-deferred.esm.js`
- `chartjs-plugin-deferred.tgz` (contains all builds)
- `chartjs-plugin-deferred.zip` (contains all builds)

## Integration

### HTML

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-deferred@2.0.0/dist/chartjs-plugin-deferred.min.js">
```

::: warning IMPORTANT
`chartjs-plugin-deferred` must be loaded **after** the Chart.js library!
:::

Once loaded, the plugin, available under the global `ChartDeferred` property, needs to be [registered](#registration).

### Module

```javascript
import {Chart} from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';
```

## Registration

Since version 2.x, this plugin **no longer registers itself automatically**. It must be manually registered either globally or locally.

```javascript
// Register the plugin to all charts:
Chart.register(ChartDeferred);
```

```javascript
// OR only to specific charts:
var chart = new Chart(ctx, {
  plugins: [ChartDeferred],
  options: {
    // ...
  }
})
```

::: tip
When imported via a [`<script>` tag](#html), use the global property `ChartDeferred`.
:::

See also [Chart.js &rsaquo; Using plugins](https://www.chartjs.org/docs/latest/developers/plugins.html).

