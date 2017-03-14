import {Component} from '@angular/core';

let template = require('./profile.component.html');
let styles = require('./profile.component.scss');

@Component({
  selector: 'profile',
  template: template,
  styles: [styles]
})
export class ProfileComponent {};
