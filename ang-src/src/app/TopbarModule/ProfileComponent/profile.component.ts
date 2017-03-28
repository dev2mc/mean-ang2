import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../shared/AuthService/auth.service';

let template = require('./profile.component.html');
let styles = require('./profile.component.scss');

@Component({
  selector: 'profile',
  template: template,
  styles: [styles]
})
export class ProfileComponent implements OnInit {
  showOptions: boolean = false;
  profile: any;
  image64: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getProfile().then(data => {
      this.profile = data;
      if (this.profile.userImageBase64 !== '') {
        this.profile.userImageObj = JSON.parse(this.profile.userImageBase64);
        this.image64 = `data:${this.profile.userImageObj.filetype};base64,${this.profile.userImageObj.base64}`;
      }
    })
  }

  goToViewProfile() {
    this.showOptions = false;
    this.router.navigate(['profileview'])
  }

  goToChangeProfile() {
    this.showOptions = false;
    this.router.navigate(['profilechange'])
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
  }
};
