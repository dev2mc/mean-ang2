import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {AuthService} from '../../shared/AuthService/auth.service';

let template = require('./profile-view.component.html');
let styles = require('./profile-view.component.scss');

@Component({
  selector: 'profile-view',
  template: template,
  styles: [styles]
})
export class ProfileViewComponent implements OnInit {
  profile: any;
  image64: string = '';

  constructor(
    private router:Router,
    private authService:AuthService
  ){};

  ngOnInit(): void {
    this.authService.getProfile().then(data => {
      this.profile = data;
      if (this.profile.userImageBase64 !== '') {
        this.profile.userImageObj = JSON.parse(this.profile.userImageBase64);
        this.image64 = `data:${this.profile.userImageObj.filetype};base64,${this.profile.userImageObj.base64}`;
      }
    })
  };

  getMailTime(ts: number): string {
    let currentDate = new Date(Date.now());
    let mailDate = new Date(ts);
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if ((currentDate.getDate() === mailDate.getDate()) && (currentDate.getMonth() === mailDate.getMonth()) && (currentDate.getFullYear() === mailDate.getFullYear())) {
        return `Today ${mailDate.getHours()}:${mailDate.getMinutes()}`
    } else {
      let monthNumber = mailDate.getMonth();
      return `${monthNames[monthNumber]} ${mailDate.getDate()} ${mailDate.getFullYear()} ${mailDate.getHours()}:${mailDate.getMinutes()}`
    }
  };

  goToChangeProfile() {
    this.router.navigate(['profilechange']);
  }
}