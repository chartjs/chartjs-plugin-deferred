import {ChartType, Plugin} from 'chart.js';
import {Options} from './options';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    deferred?: Options;
  }
}

declare const plugin: Plugin;

export default plugin;
