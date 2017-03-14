import {Component, Input} from '@angular/core';

let template = require('./data-widget.component.html');
let styles = require('./data-widget.component.scss');

@Component({
  selector: 'data-widget',
  template: template,
  styles: [styles]
})
export class DataWidgetComponent {
  @Input() type: string;
  @Input() max: number;
  @Input() count: number;
}
