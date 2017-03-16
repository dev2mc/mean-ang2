import { Component } from '@angular/core';
import '../../assets/scss/styles.scss';

let styles = require('./app.component.scss');

@Component({
  selector: 'my-app',
  template: `
    <div class='app-wrapper'>
      <header class='app-header' [hidden]='true'>
        <topbar></topbar>
      </header>
      <div class='content-wrapper'>
        <aside class='app-aside' [hidden]='true'>
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
export class AppComponent { }
