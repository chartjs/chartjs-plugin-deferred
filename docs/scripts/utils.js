function fallback(/* values ... */) {
  var ilen = arguments.length;
  var i = 0;
  var v;

  for (; i < ilen; ++i) {
    v = arguments[i];
    if (v !== undefined) {
      return v;
    }
  }
}

export var COLORS = [
  '#FF3784',
  '#36A2EB',
  '#4BC0C0',
  '#F77825',
  '#9966FF',
  '#00A8C6',
  '#379F7A',
  '#CC2738',
  '#8B628A',
  '#8FBE00',
  '#606060',
];

// Adapted from https://indiegamr.com/generate-repeatable-random-numbers-in-js/
var _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 1 : max;
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = fallback(cfg.min, 0);
  var max = fallback(cfg.max, 1);
  var from = fallback(cfg.from, []);
  var count = fallback(cfg.count, 8);
  var decimals = fallback(cfg.decimals, 8);
  var continuity = fallback(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function color(offset) {
  var count = COLORS.length;
  var index = offset === undefined ? ~~rand(0, count) : offset;
  return COLORS[index % count];
}

export function generate() {
  return {
    labels: [0, 1, 2, 3, 4, 5, 6, 7],
    datasets: [{
      backgroundColor: color(0),
      data: numbers({
        count: 8,
        max: 0,
        min: -100
      }),
    }, {
      backgroundColor: color(1),
      data: numbers({
        count: 8,
        max: 100,
        min: 0
      }),
    }],
  };
}
