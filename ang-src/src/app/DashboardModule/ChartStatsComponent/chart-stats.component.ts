import {Component, Input} from '@angular/core';

let template = require('./chart-stats.component.html');
let styles = require('./chart-stats.component.scss');

@Component({
  selector: 'chart-stats',
  template: template,
  styles: [styles]
})
export class ChartStatsComponent {
  @Input() data: Array<any>;
  @Input() labels: Array<any>;
  @Input() colors: Array<any>;
  @Input() legend: boolean;
  @Input() type: string;
}
