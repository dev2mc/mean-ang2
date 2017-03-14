import {Component, Input} from '@angular/core';

let template = require('./yearly-sales.component.html');
let styles = require('./yearly-sales.component.scss');

@Component({
  selector: 'yearly-sales',
  template: template,
  styles: [styles]
})
export class YearlySalesComponent {
  @Input() sales: number;
  @Input() visitors: number;
  @Input() customers: number;
}
