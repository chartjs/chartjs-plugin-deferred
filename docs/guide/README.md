---
title: Introduction
---

![chartjs-plugin-deferred](../assets/banner.png)

[Chart.js](https://www.chartjs.org/) plugin to defer initial chart updates until the user scrolls and the canvas appears inside the viewport, and thus trigger the initial chart animations when the user is likely to see them.

::: warning COMPATIBILITY NOTE
Requires [Chart.js](https://github.com/chartjs/Chart.js/releases) **3.x**
:::

## Table of Contents

* [Getting Started](getting-started.md)
* [Options](options.md)
* [Samples](../samples)

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

## License

`chartjs-plugin-deferred` is available under the [MIT license](https://github.com/chartjs/chartjs-plugin-deferred/blob/master/LICENSE.md).
