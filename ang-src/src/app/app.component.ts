import { Component } from '@angular/core';
import '../../assets/scss/styles.scss';

import {AuthService} from './shared/AuthService/auth.service';

let styles = require('./app.component.scss');

@Component({
  selector: 'my-app',
  template: `
    <flash-messages></flash-messages>
    <div class='app-wrapper'>
      <header class='app-header' *ngIf='authService.loggedIn()'>
        <topbar></topbar>
      </header>
      <div class='content-wrapper'>
        <aside class='app-aside' *ngIf='authService.loggedIn()'>
          <menubar></menubar>
        </aside>
        <main class='app-main'>
          <router-outlet></router-outlet>
        </main>
      </div>
  <div>
  `,
  styles: [styles]
})
export class AppComponent {
  constructor(
    private authService:AuthService,
  ) {}
}
