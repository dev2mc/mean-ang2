import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {AuthService} from '../../shared/AuthService/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module';

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

  showConfirmDialog: boolean = true;

  checkUserNameSubscription: any;

  private _usernameStream = new Subject<string>();
  private _usernames = this._usernameStream
    .filter((text:string) => {return !!text})
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
    console.log(this.arePasswordsEqual());
    // const user = {
    //   name: this.name,
    //   email: this.email,
    //   username: this.username,
    //   password: base64.encode(utf8.encode(this.password)),
    //   userImageBase64: ''
    // }

    // if (this.isUserimageValid && !!this.userImageBase64Obj) {
    //   user.userImageBase64 = JSON.stringify(this.userImageBase64Obj);
    // }

    // this.authService.registerUser(user).subscribe( data => {
    //   if (data.success) {
    //     this.flashMessage.show('Now you can log in with your username and password', {
    //       cssClass: 'alert-success',
    //       timeout: 5000
    //     });
    //     this.router.navigate(['login']);
    //   } else {
    //     this.flashMessage.show(data.msg, {
    //       cssClass: 'alert-danger',
    //       timeout: 5000
    //     });
    //   }
    // })
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