import {defaults} from 'chart.js';
import * as helpers from 'chart.js/helpers';

const {merge} = helpers;

merge(defaults.global, {
  legend: {
    display: false
  },
  title: {
    display: false
  },
  tooltips: {
    enabled: false
  }
});
