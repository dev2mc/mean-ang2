import { Component, OnInit } from '@angular/core';
import {AuthService} from '../AuthService/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

let base64 = require('base-64');
var utf8 = require('utf8');

let template = require('./login.component.html');
let styles = require('./login.component.scss');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: base64.encode(utf8.encode(this.password)),
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

}
