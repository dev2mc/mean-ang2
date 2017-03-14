import {Component, Input} from '@angular/core';

let template = require('./notifications-widget.component.html');
let styles = require('./notifications-widget.component.scss');

@Component({
  selector: 'notifications-widget',
  template: template,
  styles: [styles]
})
export class NotificationsWidgetComponent {
  @Input() twitter: number;
  @Input() email: number;
  @Input() money: number;
}
