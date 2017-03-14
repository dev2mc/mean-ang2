import {Component, Input} from '@angular/core';

let template = require('./menubar-item.component.html');
let styles = require('./menubar-item.component.scss');

@Component({
  selector: 'menubar-item',
  template: template,
  styles: [styles]
})
export class MenubarItemComponent {
  constructor(){};

  @Input() icon: string;
  @Input() name: string;
  @Input() link: string;
  @Input() number: string|boolean;
  @Input() collapse: boolean;
}
