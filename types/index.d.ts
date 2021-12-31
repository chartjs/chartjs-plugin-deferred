import {ChartType, Plugin} from 'chart.js';
import {Options} from './options'

declare module 'chart.js' {
    interface PluginOptionsByType<TType extends ChartType> {
        deffered?: Options
    }
}

declare const deffered: Plugin;

export default deffered;