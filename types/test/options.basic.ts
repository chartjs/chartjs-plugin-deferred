import {Chart} from 'chart.js';
import {Options} from '../options';

const options: Options = {
  delay: 500,
  xOffset: 20,
  yOffset: '50%'
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
