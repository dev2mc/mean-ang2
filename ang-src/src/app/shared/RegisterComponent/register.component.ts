import { Component, OnInit } from '@angular/core';
import {AuthService} from '../AuthService/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

let template = require('./register.component.html');
let styles = require('./register.component.scss');

@Component({
  selector: 'register',
  template: template,
  styles: [styles]
})
export class RegisterComponent {
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    this.authService.registerUser(user).subscribe( data => {
      if (data.success) {
        this.flashMessage.show('Now you can log in with your username and password', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.router.navigate(['login']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}