import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {Router} from '@angular/router';

import {MailModule} from '../mail.module';

import {MailComponent} from './mail.component';

import {MailService} from '../../shared/MailService/mail.service';

import {Mail} from '../../shared/MailObjInterface/mail-obj.interface';


let mails: Mail[] = [
  {
    _id: {
      $oid: '43523tgwert4253'
    },
    fromName: 'you',
    fromAddress: 'your@mail.com',
    to: 'RichardBrautigan@brautigan.com',
    category: 'poetry',
    subject: 'repellat ea tempore',
    date: 1458591630000,
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo nisi, ipsa necessitatibus asperiores odio quis deleniti maiores fugiat nihil. Iusto necessitatibus odit, repudiandae, perspiciatis deleniti ipsa saepe repellat ea tempore aspernatur perferendis!',
    sent: true,
    starred: false,
    read: false,
    openedTimes: 0
  },
  {
    _id: {
      $oid: '89087fga2345arfas'
    },
    fromName: 'Erin Belieu',
    fromAddress: 'erinbelieu@mail.com',
    to: 'your@mail.com',
    category: 'home',
    subject: 'magni veniam',
    date: 1478167358148,
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo nisi, ipsa necessitatibus asperiores odio quis deleniti maiores fugiat nihil. Iusto necessitatibus odit, repudiandae, perspiciatis deleniti ipsa saepe repellat ea tempore aspernatur perferendis!',
    sent: false,
    starred: true,
    read: false,
    openedTimes: 0
  },
  {
    _id: {
      $oid: '768456ghjbzdfq432'
    },
    fromName: 'Frank Bidart',
    fromAddress: 'frankbidart@mail.com',
    to: 'your@mail.com',
    category: 'work',
    subject: 'dolore eius',
    date: 1476270630000,
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo',
    sent: false,
    starred: false,
    read: false,
    openedTimes: 0
  },
  {
    _id: {
      $oid: '343245asfa3'
    },
    fromName: 'you',
    fromAddress: 'your@mail.com',
    to: 'RichardBrautigan@brautigan.com',
    category: 'poetry',
    subject: 'repellat ea tempore',
    date: 1461432630000,
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo',
    sent: true,
    starred: false,
    read: true,
    openedTimes: 0
  },
  {
    _id: {
      $oid: '4354warfaew3'
    },
    fromName: 'William Bronk',
    fromAddress: 'williambronk@mail.com',
    to: 'your@mail.com',
    category: 'games',
    subject: 'illo voluptas',
    date: 1478167469304,
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo',
    sent: false,
    starred: true,
    read: false,
    openedTimes: 0
  }
]

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

let MailServiceStub = {
  getMails() {
    return Promise.resolve(mails);
  },
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
  }
}

let RouterStub = {
  navigate: jasmine.createSpy('navigate')
}

describe('MailComponent: ', () => {
  let fixture: ComponentFixture<MailComponent>;
  let comp: MailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MailModule
      ],
      providers: [
        {provide: MailService, useValue: MailServiceStub},
        {provide: Router, useValue: RouterStub}
      ]
    });

    fixture = TestBed.createComponent(MailComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof MailComponent).toBe(true, 'should be craeted');
  });

  describe('NgOnit() method: ', () => {
    it('when called should invoke comp.getMails()', () => {
      spyOn(comp, 'getMails').and.callThrough();
      comp.ngOnInit();
      fixture.detectChanges();
      expect(comp.getMails).toHaveBeenCalled();
    });
  });

  describe('comp.getMails() method: ', () => {
    it('should invoke mailService.getMail method', () => {
      let mailService = fixture.debugElement.injector.get(MailService);
      spyOn(mailService, 'getMails').and.callThrough();
      comp.getMails();
      expect(mailService.getMails).toHaveBeenCalled();
    });

    it('comp.getMails should fill comp.mails array with items aquired from mailService', fakeAsync(() => {
      comp.mails = [];
      comp.getMails();
      tick();
      fixture.detectChanges();
      expect(comp.mails.length).toEqual(mails.length)
      expect(comp.mails[comp.mails.length - 1]._id).toEqual(mails[mails.length - 1]._id);
    }));
  });

  it('comp.getMailTime() should return a string with date derived from timestamp', () => {
    let testDateOld = new Date('June 12, 2016 13:40:30').getTime();
    let monthNumberOld = new Date(testDateOld).getMonth();
    let dateNumberOld = new Date(testDateOld).getDate();

    let testDateNow = Date.now();
    let testDateHours = new Date(testDateNow).getHours();
    let testDateMinutes = new Date(testDateNow).getMinutes();

    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    expect(comp.getMailTime(testDateOld)).toEqual(`${monthNames[monthNumberOld]} ${dateNumberOld}`);
    expect(comp.getMailTime(testDateNow)).toEqual(`${testDateHours}:${testDateMinutes}`);
  });

  describe('comp.toggleStarred() method: ', () => {
    let testMailItem: any;
    beforeEach(() => {
      comp.mails = mails;

      testMailItem = Object.assign({}, comp.mails[0]);
      testMailItem.starred = !testMailItem.starred;
    });

    it('should invoke mailService.updateMail() method with provided parameter', fakeAsync(() => {
      let mailService = fixture.debugElement.injector.get(MailService);
      spyOn(mailService, 'updateMail').and.callThrough();
      comp.toggleStarred(testMailItem._id);
      tick();
      expect(mailService.updateMail).toHaveBeenCalledWith(testMailItem);
    }));
  });

  describe('comp.deleteMail() method:', () => {
    it('should invoke mailService.deleteMail() method with provided parameter', () => {
      comp.mails = mails;
      let mailService = fixture.debugElement.injector.get(MailService);
      let id = 'dsfsadl;fkjsa;l';
      spyOn(mailService, 'deleteMail').and.callThrough();
      comp.deleteMail(id);
      expect(mailService.deleteMail).toHaveBeenCalledWith(id)
    });

    it('should delete item from comp.mails array', fakeAsync(() => {
      comp.mails = mails;
      let oldLength = comp.mails.length;
      let id = comp.mails[comp.mails.length - 1]._id;
      comp.deleteMail(id);
      tick();
      fixture.detectChanges();
      expect(oldLength).not.toEqual(comp.mails.length);
      expect(comp.mails[comp.mails.length - 1]._id).not.toEqual(id)
    }));
  });

  describe('comp.sendMail() method: ', () => {
    let newMailItem: Mail;

    beforeEach(() => {
      newMailItem = {
        fromName: 'Frank Bidart',
        fromAddress: 'frankbidart@mail.com',
        to: 'your@mail.com',
        category: 'work',
        subject: 'dolore eius',
        date: 1476270630000,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil veniam, dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni dolore eius. Autem ducimus vel magnam impedit dicta minus dolor magni veniam illo voluptas, dolorum at, quo',
        sent: false,
        starred: false,
        read: false,
        openedTimes: 0
      };
    });

    it('should invoke mailService.sendMail() method', () => {
      let mailService = fixture.debugElement.injector.get(MailService);
      spyOn(mailService, 'sendMail').and.callThrough();
      comp.sendMail(newMailItem);
      expect(mailService.sendMail).toHaveBeenCalledWith(newMailItem);
    });

    it('should push new item to comp.mails', fakeAsync(() => {
      comp.mails = mails;
      let mailsOldLength = comp.mails.length;
      comp.sendMail(newMailItem);
      tick();
      expect(comp.mails.length).not.toEqual(mailsOldLength);
      expect(comp.mails[comp.mails.length - 1]._id).toEqual('43534fdsgrwe4543523r');
    }));
  });

  describe('comp.toggleReadMail() method: ', () => {
    beforeEach(() => {
      comp.mails = mails;
    });

    it('should invoke mailService.updateMail() method with provided parameter', () => {
      let id = comp.mails[comp.mails.length - 1]._id;
      let updatedItem = Object.assign({}, comp.mails[comp.mails.length - 1]);
      updatedItem.read = !updatedItem.read;
      let mailService = fixture.debugElement.injector.get(MailService);
      spyOn(mailService, 'updateMail').and.callThrough();
      comp.toggleReadMail(id);
      expect(mailService.updateMail).toHaveBeenCalledWith(updatedItem);
    });

    it('should make read property of mail item to be opposite one (boolean)', fakeAsync(() => {
      let id = comp.mails[comp.mails.length -1]._id;
      let oldReadValue = comp.mails[comp.mails.length -1].read;
      comp.toggleReadMail(id);
      tick();
      expect(comp.mails[comp.mails.length -1].read).toEqual(oldReadValue);
    }));
  });

  describe('comp.markAsRead() method: ', () => {
    beforeEach(() => {
      comp.mails = mails;
    });

    it('should invoke  mailService.updateMail() method with provided parameter', () => {
      it('should invoke mailService.updateMail() method with provided parameter', () => {
        let id = comp.mails[comp.mails.length - 1]._id;
        comp.mails[comp.mails.length - 1].read = true;
        let updatedItem = Object.assign({}, comp.mails[comp.mails.length - 1]);
        updatedItem.read = false;

        let mailService = fixture.debugElement.injector.get(MailService);

        spyOn(mailService, 'updateMail').and.callThrough();
        comp.markAsRead(id);
        expect(mailService.updateMail).toHaveBeenCalledWith(updatedItem);
      });
    });
  });

  describe('comp.encreaseOpened() method: ', () => {
    beforeEach(() => {
      comp.mails = mails;
    });

    it('should invoke  mailService.updateMail() method with provided parameter', () => {
      it('should invoke mailService.updateMail() method with provided parameter', () => {
        let id = comp.mails[comp.mails.length - 1]._id;
        let updatedItem = Object.assign({}, comp.mails[comp.mails.length - 1]);
        updatedItem.openedTimes = updatedItem.openedTimes++;

        let mailService = fixture.debugElement.injector.get(MailService);

        spyOn(mailService, 'updateMail').and.callThrough();
        comp.encreaseOpened(id);
        expect(mailService.updateMail).toHaveBeenCalledWith(updatedItem);
      });
    });
  });

  describe('comp.addToSelectedIds() method: ', () => {
    it('should add provided id to comp.selectedIds array if it isnt present on this array', () => {
      comp.selectedIds = [];
      let id = '3423423';
      comp.addToSelectedIds(id);
      expect(comp.selectedIds.indexOf(id) > -1).toBeTruthy();
    });

    it('should remove provided id from comp.selectedIds array if it is present on this array', () => {
      comp.selectedIds = ['3423423'];
      let id = '3423423';
      comp.addToSelectedIds(id);
      expect(comp.selectedIds.indexOf(id) === -1).toBeTruthy();
    });
  });

  describe('comp.showIfSelected() method: ', () => {
    it('should return true if id is present on comp.selectedIds', () => {
      comp.selectedIds = ['3423423'];
      let id = '3423423';
      expect(comp.showIfSelected(id)).toEqual(true);
    });

    it('should return false if id is not present on comp.selectedIds', () => {
      comp.selectedIds = [];
      let id = '3423423';
      expect(comp.showIfSelected(id)).toEqual(false);
    });
  });

  it('comp.getUnreadCount() method should return number of unread emails', () => {
    let actualNumber = 4;
    comp.mails = mails;

    expect(comp.getUnreadCount()).toEqual(actualNumber);
  });

  it('comp.getSelectedStarredCount() method should return number of sent emails selected by user', () => {

    comp.selectedIds = ['43523tgwert4253', '89087fga2345arfas', '768456ghjbzdfq432', '343245asfa3', '4354warfaew3'];
    comp.mails = mails;

    let actualNumber = comp.mails.filter((v) => {
      return ((comp.selectedIds.indexOf(v._id) > -1) && (v.starred === true))
    }).length;

    expect(comp.getSelectedStarredCount()).toEqual(actualNumber);
  });
});
