import {Component} from '@angular/core';

let styles = require('./topbar.component.scss');

@Component({
  selector: 'topbar',
  template: `
  <div class="topbar">
    <div class="topbar__link-wrapper">
      <a routerLink="/" class="topbar__link">
        <h1 class="topbar__logo">Dash<span class="topbar__logo_f-weight_thinner">Board</span></h1>
      </a>
    </div>
    <div class="topbar__search-notifs-wrapper">
      <div class="topbar__search-wrapper"><search></search></div>
      <div class="topbar__notifs-wrapper"><notifications></notifications></div>
    </div>
    <div class="topbar__profile-wrapper"><profile></profile></div>
  </div>
  `,
  styles: [styles]
})
export class TopbarComponent {};
