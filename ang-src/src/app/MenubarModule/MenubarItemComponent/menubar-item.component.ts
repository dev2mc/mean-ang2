import {Component, Input} from '@angular/core';
import {AuthService} from '../../shared/AuthService/auth.service';
import {Router} from '@angular/router';

let template = require('./menubar-item.component.html');
let styles = require('./menubar-item.component.scss');

@Component({
  selector: 'menubar-item',
  template: template,
  styles: [styles]
})
export class MenubarItemComponent {
  constructor(
    private authService:AuthService,
    private router:Router
  ){};

  @Input() icon: string;
  @Input() name: string;
  @Input() link: string;
  @Input() collapse: boolean;

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
