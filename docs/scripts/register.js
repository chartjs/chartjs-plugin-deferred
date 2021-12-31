import {Chart, registerables} from 'chart.js';
import plugin from '../../dist/chartjs-plugin-deferred.js';

Chart.register(...registerables);
Chart.register(plugin);
