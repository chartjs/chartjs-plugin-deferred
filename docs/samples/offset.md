---
sidebarDepth: 0
---

# Offset

This example demonstrates the impact of the [`yOffset` option](../guide/options.md#delay)
when scrolling vertically. The first chart uses the default options (no offset) while the
second chart uses an offset in pixels and the last one a offset in percent.

<div class="head">
  <div>Scroll down</div>
  <div class="icon">&#8675;</div>
</div>

## No offset (default)

```js chart-editor
Utils.srand(0);

const options = /* <block:options> */
{
  plugins: {
    deferred: {
      // defaults
    },
  },
}/* </block:options> */;

module.exports = {
  config: {
    type: 'bar',
    options: options,
    data: Utils.generate(),
  },
}
```

## Offset (256 pixels)

```js chart-editor
Utils.srand(0);

const options = /* <block:options> */
{
  plugins: {
    deferred: {
      yOffset: 256
    },
  },
}/* </block:options> */;

module.exports = {
  config: {
    type: 'bar',
    options: options,
    data: Utils.generate(),
  },
}
```

## Offset (50 percent)

```js chart-editor
Utils.srand(0);

const options = /* <block:options> */
{
  plugins: {
    deferred: {
      yOffset: '50%'
    },
  },
}/* </block:options> */;

module.exports = {
  config: {
    type: 'bar',
    options: options,
    data: Utils.generate(),
  },
}
```

<div class="foot">
  Reload the page to reset the sample
</div>

<style lang="styl" scoped>
.chart-editor
  margin 2rem auto 6rem auto

.head
  display flex
  align-items center
  justify-content center
  flex-direction column
  font-weight 800
  font-size 1.5rem
  min-height 80vh
  opacity 0.5

  .icon
    font-size 1.5em
    opacity 0.5

.foot
  text-align center
  font-weight 600
  padding 16px 0
</style>
