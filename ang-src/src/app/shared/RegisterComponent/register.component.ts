import {Component, OnInit, ElementRef} from '@angular/core';
import {AuthService} from '../AuthService/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

let base64 = require('base-64');
var utf8 = require('utf8');

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
  password: string;
  image64: any = null;
  imageInputElem: HTMLInputElement;
  userImageElem: HTMLImageElement;
  userImageBase64Obj: any = null;
  isUserimageValid: boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private elemRef: ElementRef
  ) {}

  ngOnInit() {
    this.imageInputElem = this.elemRef.nativeElement.querySelector('.register__input_type_file');
    this.userImageElem = this.elemRef.nativeElement.querySelector('.register__userimage');

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

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: base64.encode(utf8.encode(this.password)),
      userImageBase64: ''
    }

    if (this.isUserimageValid && !!this.userImageBase64Obj) {
      user.userImageBase64 = this.userImageBase64Obj.base64;
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