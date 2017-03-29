import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

let template = require('./profile-view.component.html');
let styles = require('./profile-view.component.scss');

@Component({
  selector: 'profile-view',
  template: template,
  styles: [styles]
})
export class ProfileViewComponent implements OnInit {
  constructor(
    private router:Router
  ){};

  ngOnInit(): void {

  };
}
