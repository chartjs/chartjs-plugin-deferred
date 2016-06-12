/*global window: false */
"use strict";

(function() {

	var Chart = window.Chart;
	var helpers = Chart.helpers;

	/**
	 * Plugin based on discussion from Chart.js issue #2745.
	 * @see https://github.com/chartjs/Chart.js/issues/2745
	 */
	Chart.Deferred = Chart.Deferred || {};
	Chart.Deferred.defaults = {
		enabled: true,
		xOffset: 0,
		yOffset: 0,
		delay: 0
	};

	// DOM implementation
	// @todo move it in Chart.js: src/core/core.platform.js
	Chart.platform = helpers.extend(Chart.platform || {}, {
		defer: function(fn, delay, scope) {
			window.setTimeout(function() {
				fn.call(scope)
			}, delay);
		}
	});

	var deferred_instances = [];

	function computeOffset(value, base) {
		var number = parseInt(value, 10);
		if (isNaN(number)) {
			return 0;
		} else if (typeof value === 'string' && value.indexOf('%') !== -1) {
			return number / 100 * base;
		} else {
			return number;
		}
	}

	function chartInViewport(instance) {
		var canvas = instance.chart.canvas;
		var model = instance._deferred_model;
		var rect = canvas.getBoundingClientRect();
		var dy = computeOffset(model.yOffset || 0, rect.height);
		var dx = computeOffset(model.xOffset || 0, rect.width);

		return rect.right - dx >= 0
			&& rect.bottom - dy >= 0
			&& rect.left + dx <= window.innerWidth
			&& rect.top + dy <= window.innerHeight;
	}

	helpers.addEvent(window, 'scroll', function() {
		var instances = deferred_instances.slice(0);
		var ilen = instances.length;
		var instance, i;

		for (i=0; i<ilen; ++i) {
			instance = instances[i];
			if (chartInViewport(instance)) {
				instance.update();
			}
		}
	});

	function buildDeferredModel(instance) {
		var defaults = Chart.Deferred.defaults;
		var options = instance.options.deferred;
		var getValue = helpers.getValueOrDefault;

		if (options === undefined) {
			options = {};
		} else if (typeof options === 'boolean') {
			// accepting { options: { deferred: true } }
			options = { enabled: options };
		}

		return {
			enabled: getValue(options.enabled, defaults.enabled),
			xOffset: getValue(options.xOffset, defaults.xOffset),
			yOffset: getValue(options.yOffset, defaults.yOffset),
			delay: getValue(options.delay, defaults.delay),
			delayed: false,
			loaded: false
		};
	}

	Chart.plugins.register({
		beforeInit: function(instance) {
			instance._deferred_model = buildDeferredModel(instance);
			deferred_instances.push(instance);
		},

		beforeDatasetsUpdate: function(instance) {
			var model = instance._deferred_model;
			var index;

			if (!model.loaded) {
				if (model.enabled && !chartInViewport(instance)) {
					// cancel the datasets update
					return false;
				}

				// avoid extra scroll update by removing the chart from the lazy instances.
				index = deferred_instances.indexOf(instance);
				deferred_instances.splice(index, 1);
				model.loaded = true;

				if (model.delay > 0) {
					model.delayed = true;
					Chart.platform.defer(function() {
						model.delayed = false;
						instance.update();
					}, model.delay);

					return false;
				}
			}

			if (model.delayed) {
				// in case of delayed update, ensure to block external requests, such
				// as interacting with the legend label, or direct calls to update()
				return false;
			}
		}
	});

})();
