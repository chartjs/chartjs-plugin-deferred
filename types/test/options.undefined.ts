import {Chart} from 'chart.js';

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
      // no deferred options
    }
  }
});
