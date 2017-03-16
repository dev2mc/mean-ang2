import {Component} from '@angular/core';

let template = require('./login.component.html');
let styles = require('./login.component.scss');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class LoginComponent {}