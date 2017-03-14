import {Component} from '@angular/core';

let template = require('./404.component.html');
let styles = require('./404.component.scss');

@Component({
  selector: 'not-found',
  template: template,
  styles: [styles]
})
export class NotFoundComponent {}
