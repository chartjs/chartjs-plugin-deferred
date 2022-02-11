# Migration

## Migrating to v2.0.0

### Breaking Changes

Make sure to also read the [Chart.js v3 migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration.html) since you may be impacted by more general breaking changes due to this new Chart.js version.

#### Explicit Plugin Registration

As described in the [getting started](getting-started.md#integration), it's now required to manually register this plugin, either globally:

```js
Chart.register(ChartDeferred);
```

or locally:

```js
new Chart('foo', {
  plugins: [ChartDeferred]
})
```

#### Plugin registration

Chart.js v3 changed the way to register plugins and now requires to use `Chart.register(plugin)` instead of `Chart.plugins.register(plugin)`.

```js
import {Chart} from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';

Chart.register(ChartDeferred);
```

See [Getting Started > Registration](getting-started.html#registration) for details.

#### Default options

The plugin default options are now accessible in `Chart.defaults.plugins.deferred.*` instead of `Chart.defaults.global.plugins.deferred.*` and can be modified using:

```js
Chart.defaults.set('plugins.deferred', {
  delay: 100,
  // ...
})
```

### Notes

#### Chart.js type declaration <Badge text="TS only"/>

Chart.js v3 now provides TypeScript type declaration files bundled in the npm package so it's **not** anymore required to install the `@types/chart.js` package.
