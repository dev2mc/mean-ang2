import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import {Router} from '@angular/router';

import {MailService} from '../../shared/MailService/mail.service';

import {Mail} from '../../shared/MailObjInterface/mail-obj.interface';

let template = require('./mail.component.html');
let styles = require('./mail.component.scss');

@Component({
  selector: 'mail',
  template: template,
  styles: [styles]
})
export class MailComponent implements OnInit {
  type: string = 'inbox';

  constructor(
    private mailService:MailService,
    private cd:ChangeDetectorRef,
    private router:Router
  ){};

  ngOnInit(): void {

  };

  changeMailType(type:string): void {
    this.type = type
  }
}
