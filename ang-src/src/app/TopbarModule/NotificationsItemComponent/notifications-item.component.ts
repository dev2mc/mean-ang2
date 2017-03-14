import {Component, Input} from '@angular/core';

let template = require('./notifications-item.component.html');
let styles = require('./notifications-item.component.scss');

@Component({
  selector: 'notifications-item',
  template: template,
  styles: [styles]
})
export class NotificationsItemComponent {
  @Input() type: string;
  @Input() link: string;
  @Input() quantity: string;
};
