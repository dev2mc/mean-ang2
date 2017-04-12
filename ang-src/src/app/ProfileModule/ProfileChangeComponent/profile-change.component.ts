import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {AuthService} from '../../shared/AuthService/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

let base64 = require('base-64');
var utf8 = require('utf8');

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

let template = require('./profile-change.component.html');
let styles = require('./profile-change.component.scss');

@Component({
  selector: 'profile-change',
  template: template,
  styles: [styles]
})
export class ProfileChangeComponent implements OnInit, OnDestroy {
  newName: string = '';
  newUsername: string = '';
  newPassword: string = '';
  newPasswordRepeat: string = '';
  image64: any = null;
  imageInputElem: HTMLInputElement;
  userImageElem: HTMLImageElement;
  userImageBase64Obj: any = null;
  isUserimageValid: boolean = false;

  profile: any;
  image64Original: string = '';

  isUsernameUsed: boolean = false;

  showConfirmDialog: boolean = false;

  checkUserNameSubscription: any;

  private _usernameStream = new Subject<string>();
  private _usernames = this._usernameStream
    .filter((text:string) => {
      if (typeof text === 'string' && text.length === 0) {
        this.isUsernameUsed = false;
      }
      return !!text;
    })
    .distinctUntilChanged()
    .debounceTime(600)
    .subscribe(
      (username: string) => {
        this. checkUserNameSubscription = this.authService.checkUsername(username).subscribe((result) => {
          this.isUsernameUsed = result.usernameUsed;
        })
      }
    );

  checkUsername() {
    this._usernameStream.next(this.newUsername);
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private elemRef: ElementRef
  ) {}

  ngOnInit() {
    this.imageInputElem = this.elemRef.nativeElement.querySelector('.profile-change__input_type_file');
    this.userImageElem = this.elemRef.nativeElement.querySelector('.profile-change__userimage');

    this.imageInputElem.onchange = () => {
      if (this.imageInputElem.files && this.imageInputElem.files.length > 0) {
        this.base64(this.imageInputElem.files[0], (base64Img: any) => {
          this.userImageBase64Obj = base64Img;
          this.image64 = `data:${base64Img.filetype};base64,${base64Img.base64}`;

          setTimeout(() => {
            this.validateUserimage();

            if (!this.isUserimageValid) {
              this.resetUserImage();
            }
          }, 1000)
        });
      } else {
        this.resetUserImage();
      }
    }

    this.authService.getProfile().then(data => {
      this.profile = data;
      if (this.profile.userImageBase64 !== '') {
        this.profile.userImageObj = JSON.parse(this.profile.userImageBase64);
        this.image64Original = `data:${this.profile.userImageObj.filetype};base64,${this.profile.userImageObj.base64}`;
      }
    })
  }

  base64(file:any, callback:any){
    var coolFile:any = {};
    function readerOnload(e:any){
      var base64 = btoa(e.target.result);
      coolFile.base64 = base64;
      let base64Img = base64;
      callback(coolFile);
    };

    var reader = new FileReader();
    reader.onload = readerOnload;

    coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);
  }

  validateUserimage() {
    if (
      this.userImageElem.width <= 100
      && this.userImageElem.height <= 100
      && this.userImageElem.width >= 34
      && this.userImageElem.height >= 34
    ) {
      this.isUserimageValid = true;
    } else {
      this.isUserimageValid = false;

    }
  }

  resetUserImage() {
    this.imageInputElem.value = '';
    this.image64 = null;
    this.isUserimageValid = false;
    this.userImageBase64Obj = null
  }

  arePasswordsEqual() {
    if (this.newPassword !== '' && this.newPasswordRepeat !== '' && this.newPassword.localeCompare(this.newPasswordRepeat) === 0) {
      return true;
    } else {
      return false;
    }
  }

  arePasswordFieldsEmpty() {
    if (this.newPassword.localeCompare(this.newPasswordRepeat) === 0) {
      return true;
    } else {
      return false;
    }
  }



  onProfileChangeSubmit() {
    const user: any = {
      name: null,
      username: null,
      password: null,
      userImageBase64: null
    }

    // const user = {};

    if (this.newName !== '') {
      user.name = this.newName;
    }

    if (!this.isUsernameUsed && this.newUsername!=="") {
      user.username = this.newUsername;
    }

    if (this.arePasswordsEqual() === true) {
      user.password = base64.encode(utf8.encode(this.newPassword));
    }

    if (this.isUserimageValid && !!this.userImageBase64Obj) {
      user.userImageBase64 = JSON.stringify(this.userImageBase64Obj);
    }

    this.authService.changeProfile(user).then( data => {
      if (data.success) {
        if (user.username || user.password) {
          let msgUser = !!user.username ? 'username ' : '';
          let msgPass = !!user.password ? 'password' : '';
          let msgAnd = (user.password && user.username) ? 'and ' : '';
          let message = `Now you have to log in with your new ${msgUser}${msgAnd}${msgPass}`;

          this.flashMessage.show(message, {
            cssClass: 'alert-success',
            timeout: 5000
          });
          this.authService.logout();
          this.router.navigate(['login']);
        } else {

          this.flashMessage.show('Your data has been changed', {
            cssClass: 'alert-success',
            timeout: 5000
          });
          window.location.reload();
          this.router.navigate(['dashboard']);
        }


      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })

    this.authService.changeProfile(user)
    .then((resp) => {
      if (user.username || user.password) {
        this.router.navigate(['logout'])
      }
    })
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  ngOnDestroy() {
    if (this.checkUserNameSubscription) {
      this.checkUserNameSubscription.unsubscribe();
    }

    if (this.imageInputElem) {
      this.imageInputElem.onchange = null;
    }
  }
}