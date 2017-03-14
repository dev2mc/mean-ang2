import {Component, Input} from '@angular/core';

let template = require('./data-graph.component.html');
let styles = require('./data-graph.component.scss');

@Component({
  selector: 'data-graph',
  template: template,
  styles: [styles]
})
export class DataGraphComponent {
  @Input() earnings: number;
}
