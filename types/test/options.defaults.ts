import {Chart} from 'chart.js';
import {Options} from '../options';

const options: Options = {
  // all optional deferred options
};

const chart = new Chart('id', {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  },
  options: {
    plugins: {
      deferred: options
    }
  }
});
