import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {tokenNotExpired} from 'angular2-jwt';

import {WindowRefService} from '../WindowRefService/window-ref.service';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:Http,
    private windService:WindowRefService
  ) { }

  registerUser(user:any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/register', user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user: any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/authenticate', user,{headers: headers})
    .map(res => {
      let data = res.json();
      if(data.success){
        this.storeUserData(data.token, data.user);
        return {success: true, msg: 'success'};
      } else {
        return {success: false, msg: data.msg};
      }
    });
  }

   getProfile(){
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': this.loadToken()
      }
    );

    return this.http.get('http://localhost:3000/profile',{headers: headers})
    .toPromise()
    .then((response: any) => {
      let resObj = JSON.parse(response._body);
      return resObj.data;
    })
  }

  checkUsername(username: string) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': this.loadToken()
      }
    );

    return this.http.get(`http://localhost:3000/checkuser/${username}`,{headers: headers})
    .map(res => {
      let response = res.json();
      return {usernameUsed: response.data}
    })
  }

  changeProfile(profileData: any) {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': this.loadToken()
      }
    );

    return this.http.post('http://localhost:3000/profilechange', profileData, {headers: headers})
    .toPromise()
    .then((response: any) => {
      let resObj = JSON.parse(response._body);
      return resObj;
    })
  }

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.windService.nativeWindow.location.reload();
  }
}
