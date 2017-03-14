import {Component, Input} from '@angular/core';

let template = require('./update.component.html');
let styles = require('./update.component.scss');

@Component({
  selector: 'update',
  template: template,
  styles: [styles]
})
export class UpdateComponent {
  constructor(){};

  @Input() type:string;
  @Input() data: any;
}
