import {defaults} from 'chart.js';
import {merge} from 'chart.js/helpers';

merge(defaults.plugins, {
  legend: {
    display: false
  },
  tooltip: {
    enabled: false
  }
});
