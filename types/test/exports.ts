import {Chart} from 'chart.js';
import Plugin from '../index';

// Plugin instance
Chart.register(Plugin);
Chart.unregister(Plugin);

const chart = new Chart('id', {
  data: {
    labels: [],
    datasets: []
  },
  type: 'bar',
  options: {},
  plugins: [Plugin]
});
