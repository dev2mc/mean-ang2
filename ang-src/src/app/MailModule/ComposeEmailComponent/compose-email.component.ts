import {Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewEncapsulation} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {MailService} from '../../shared/MailService/mail.service';
import {WindowRefService} from '../../shared/WindowRefService/window-ref.service';
import {DocumentRefService} from '../../shared/DocumentRefService/document-ref.service';

import {Mail} from '../../shared/MailObjInterface/mail-obj.interface';

const template = require('./compose-email.component.html');
const styles = require('./compose-email.component.scss');

@Component({
  selector: 'compose-email',
  template: template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class ComposeEmailComponent implements OnInit, OnDestroy {
  content: HTMLElement;
  defaultMail: Mail = {
    fromName: 'you',
    fromAddress: 'your@mail.com',
    to: '',
    category: '',
    subject: '',
    date: 0,
    body: '',
    sent: true,
    starred: false,
    read: true,
    openedTimes: 1
  };

  private mailId: string;

  private isResponse: boolean = false;

  private paramSub: any;

  constructor(
    private el:ElementRef,
    private router:Router,
    private aRoute: ActivatedRoute,
    private mailService:MailService
  ) {}

  ngOnInit(): void {
    this.paramSub = this.aRoute.params.subscribe(params => {
      this.mailId = params['id'];

      if (this.mailId !== 'none') {
        this.mailService.getMail(this.mailId).then((data) => {
          this.isResponse = true;
          this.defaultMail.to = data.fromAddress;
          this.defaultMail.category = 'response';
          this.defaultMail.subject = `In respose to: ${data.subject}`;
          this.defaultMail.body = `---------------------------
${data.body}
---------------------------
`;
        }).catch((err => console.log(`Email with provided id does not exist: ${err}`)))
      }
    }
  );

    this.content = this.el.nativeElement.querySelector('.compose-email__content');
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  goToMail():void {
    this.defaultMail = null;

    if (this.isResponse) {
      this.router.navigate(['/viewmail', this.mailId]);
    } else {
      this.router.navigate(['/mail']);
    }
  }

  sendEmail(): void {
    let timeNow = Date.now();
    this.defaultMail.date = timeNow;
    this.mailService.sendMail(this.defaultMail).then(()=>{this.goToMail()});
  }
}
