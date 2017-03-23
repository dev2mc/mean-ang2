import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../../shared/AuthService/auth.service';

@Injectable()
export class LoginGuard implements CanActivate{
  constructor(
    private authService:AuthService,
    private router:Router,
    private location:Location
    ){}

  canActivate(){
    if(!this.authService.loggedIn()){
      return true;
    } else {
      // this.router.navigate(['/dashboard']);
      this.location.back();
      return false;
    }
  }
}
