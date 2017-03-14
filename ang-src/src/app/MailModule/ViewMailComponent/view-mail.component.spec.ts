import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MailModule} from '../mail.module';

import {Router, ActivatedRoute} from '@angular/router';

import {ViewMailComponent} from './view-mail.component';

import {MailService} from '../../shared/MailService/mail.service';

import {Mail} from'../../shared/MailObjInterface/mail-obj.interface';

// import {Rx} from 'rxjs/bundles/Rx';

let Rx = require('rxjs/Rx');

let fakeMail = {
  _id: {
    $oid: '78967ftjfyt654'
  },
  fromName: 'you',
  fromAddress: 'your@mail.com',
  to: 'NameName@name.com',
  category: 'poetry',
  subject: 'repellat ea tempore',
  date: 1458591630000,
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo nisi, ipsa necessitatibus asperiores odio quis deleniti maiores fugiat nihil. Iusto necessitatibus odit, repudiandae, perspiciatis deleniti ipsa saepe repellat ea tempore aspernatur perferendis!',
  sent: true,
  starred: false,
  read: false,
  openedTimes: 0
};

let ActivatedRouteStub = {
  data: {
    route: Rx.Observable.create(function(observer: any) {
      observer.onNext({data: fakeMail});
      observer.onComplete();
    })
  }
};

let RouterStub = {
  navigate: jasmine.createSpy('navigate')
};

let MailServiceStub = {
  sendMail(mail: Mail) {
    mail._id = {
      $oid: '43534fdsgrwe4543523r'
    };
    return Promise.resolve(mail);
  },
  updateMail(mail: Mail) {
    return Promise.resolve(mail);
  },
  deleteMail(id: string) {
    return Promise.resolve(fakeMail);
  },
  getMail(id: string) {
    return Promise.resolve(fakeMail);
  }
};

describe('ViewMailComponent: ', () => {
  let fixture:ComponentFixture<ViewMailComponent>;
  let comp: ViewMailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MailModule
      ],
      providers: [
        {provide: MailService, useValue: MailServiceStub},
        {provide: ActivatedRoute, useValue: ActivatedRouteStub},
        {provide: Router, useValue: RouterStub}
      ]
    });

    fixture = TestBed.createComponent(ViewMailComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof ViewMailComponent).toBe(true, 'should be created')
  });
})
