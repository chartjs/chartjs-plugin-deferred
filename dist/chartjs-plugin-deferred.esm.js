/*!
 * chartjs-plugin-deferred v2.0.0
 * https://chartjs-plugin-deferred.netlify.app
 * (c) 2016-2022 chartjs-plugin-deferred contributors
 * Released under the MIT license
 */
import { requestAnimFrame, getStyle } from 'chart.js/helpers';

var STUB_KEY = '$chartjs_deferred';
var MODEL_KEY = '$deferred';

/**
 * Plugin based on discussion from Chart.js issue #2745.
 * @see https://github.com/chartjs/Chart.js/issues/2745
 */

function defer(fn, delay) {
  if (delay) {
    window.setTimeout(fn, delay);
  } else {
    requestAnimFrame.call(window, fn);
  }
}

function computeOffset(value, base) {
  var number = parseInt(value, 10);
  if (isNaN(number)) {
    return 0;
  } else if (typeof value === 'string' && value.indexOf('%') !== -1) {
    return number / 100 * base;
  }
  return number;
}

function chartInViewport(chart) {
  var options = chart[MODEL_KEY].options;
  var canvas = chart.canvas;

  // https://stackoverflow.com/a/21696585
  if (!canvas || canvas.offsetParent === null) {
    return false;
  }

  var rect = canvas.getBoundingClientRect();
  var dy = computeOffset(options.yOffset || 0, rect.height);
  var dx = computeOffset(options.xOffset || 0, rect.width);

  return rect.right - dx >= 0
    && rect.bottom - dy >= 0
    && rect.left + dx <= window.innerWidth
    && rect.top + dy <= window.innerHeight;
}

function onScroll(event) {
  var node = event.target;
  var stub = node[STUB_KEY];
  if (stub.ticking) {
    return;
  }

  stub.ticking = true;
  defer(function() {
    var charts = stub.charts.slice();
    var ilen = charts.length;
    var chart, i;

    for (i = 0; i < ilen; ++i) {
      chart = charts[i];
      if (chartInViewport(chart)) {
        unwatch(chart); // eslint-disable-line
        chart[MODEL_KEY].appeared = true;
        chart.update();
      }
    }

    stub.ticking = false;
  });
}

function isScrollable(node) {
  var type = node.nodeType;
  if (type === Node.ELEMENT_NODE) {
    var overflowX = getStyle(node, 'overflow-x');
    var overflowY = getStyle(node, 'overflow-y');
    return overflowX === 'auto' || overflowX === 'scroll'
      || overflowY === 'auto' || overflowY === 'scroll';
  }

  return node.nodeType === Node.DOCUMENT_NODE;
}

function watch(chart) {
  var canvas = chart.canvas;
  var parent = canvas.parentElement;
  var stub, charts;

  while (parent) {
    if (isScrollable(parent)) {
      stub = parent[STUB_KEY] || (parent[STUB_KEY] = {});
      charts = stub.charts || (stub.charts = []);
      if (charts.length === 0) {
        parent.addEventListener('scroll', onScroll);
      }

      charts.push(chart);
      chart[MODEL_KEY].elements.push(parent);
    }

    parent = parent.parentElement || parent.ownerDocument;
  }
}

function unwatch(chart) {
  chart[MODEL_KEY].elements.forEach(function(element) {
    var charts = element[STUB_KEY].charts;
    charts.splice(charts.indexOf(chart), 1);
    if (!charts.length) {
      element.removeEventListener('scroll', onScroll);
      delete element[STUB_KEY];
    }
  });

  chart[MODEL_KEY].elements = [];
}

var plugin = {
  id: 'deferred',

  defaults: {
    xOffset: 0,
    yOffset: 0,
    delay: 0
  },

  beforeInit: function(chart, _, options) {
    chart[MODEL_KEY] = {
      options: options,
      appeared: false,
      delayed: false,
      loaded: false,
      elements: []
    };

    watch(chart);
  },

  beforeDatasetsUpdate: function(chart, _, options) {
    var model = chart[MODEL_KEY];
    if (!model.loaded) {
      if (!model.appeared && !chartInViewport(chart)) {
        // cancel the datasets update
        return false;
      }

      model.appeared = true;
      model.loaded = true;
      unwatch(chart);

      if (options.delay > 0) {
        model.delayed = true;
        defer(function() {
          // Ensure the chart instance is still alive. It may have been destroyed
          // during a delay and calling `chart.update()` will fail. The most common
          // reason for such scenario is user navigation.
          // https://github.com/chartjs/chartjs-plugin-deferred/pull/14
          if (chart.ctx) {
            model.delayed = false;
            chart.update();
          }
        }, options.delay);

        return false;
      }
    }

    if (model.delayed) {
      // in case of delayed update, ensure to block external requests, such
      // as interacting with the legend label, or direct calls to update()
      return false;
    }
  },

  destroy: function(chart) {
    unwatch(chart);
  }
};

export { plugin as default };
