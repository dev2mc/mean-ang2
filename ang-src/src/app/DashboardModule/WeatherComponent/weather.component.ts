import {Component, Input} from '@angular/core';

let template = require('./weather.component.html');
let styles = require('./weather.component.scss');

@Component({
  selector: 'weather',
  template: template,
  styles: [styles]
})
export class WeatherComponent {
  @Input() type: string;
  @Input() temperature: number
  @Input() location: string;
}
