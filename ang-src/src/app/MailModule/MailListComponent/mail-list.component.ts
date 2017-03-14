import {Component, Input, OnInit, OnChanges, SimpleChange, ChangeDetectorRef} from '@angular/core';

import {Router} from '@angular/router';

import {MailService} from '../../shared/MailService/mail.service';

import {Mail} from '../../shared/MailObjInterface/mail-obj.interface';

let template = require('./mail-list.component.html');
let styles = require('./mail-list.component.scss');

@Component({
  selector: 'mail-list',
  template: template,
  styles: [styles]
})
export class MailListComponent implements OnInit, OnChanges {
  @Input() type: string;

  mails: Mail[] = [];
  inboxMails: Mail[] = [];
  sentMails: Mail[] = [];
  strarredMails: Mail[] = [];
  splitMailsArr: any = [];

  selectedIds: string[] = [];
  showInfo: boolean = false;

  currentCount: number = 0;
  mailsCount: number;

  constructor(
    private mailService:MailService,
    private cd:ChangeDetectorRef,
    private router:Router
  ){};

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      let newValue = changedProp.currentValue
      this.getMails(newValue);
    }
  }

  ngOnInit(): void {};

  getMails(type: string): Promise<Mail[]> {
    return this.mailService.getMails().then((data) => {
      return this.sortMails(data, type);
    });
  };

  nextMails(): void {
    if (this.currentCount < (this.splitMailsArr.length - 1)) {
      this.currentCount = this.currentCount + 1;
      this.mails = this.splitMailsArr[this.currentCount];
    }
  }

  prevMails(): void {
    if (this.currentCount > 0) {
      this.currentCount = this.currentCount - 1;
      this.mails = this.splitMailsArr[this.currentCount]
    }
  }

  //SORT AND FILTER EMAILS FUNCTIONS-----

  sortMails(data: Mail[], type:string) {
    let filteredMails: Mail[];

    if (type === 'inbox') {

      filteredMails = this.filterInboxMails(data);

    } else if (type === 'sent') {

      filteredMails = this.filterSentMails(data);

    } else if (type === 'starred') {

      filteredMails = this.filterStarredMails(data);
    }

    let unreadMails = this.sortArrMailsDecent(this.filterUnreadMails(filteredMails));
    let readMails = this.sortArrMailsDecent(this.filterReadMails(filteredMails));

    let allMails = unreadMails.concat(readMails);
    this.mailsCount = allMails.length;

    this.splitMailsArr = this.splitMails(allMails);

    this.currentCount = 0;

    return this.mails = this.splitMailsArr[this.currentCount];
  }

  splitMails(arr: Mail[]): any {
    let count = Math.ceil(arr.length/20);
    let splitArr: any = [];

    while (count > 0) {
      let temparr = arr.splice(0, 20);
      splitArr.push(temparr);
      count--;
    }

    return splitArr;
  }

  filterReadMails(arr: Mail[]): Mail[] {
    return arr.filter((v) => {
      return v.read;
    })
  };

  filterUnreadMails(arr: Mail[]): Mail[] {
    return arr.filter((v) => {
      return !v.read;
    })
  };

  sortArrMailsDecent(arr: Mail[]): Mail[] {
    return arr.sort((a, b) => {
      return b.date - a.date;
    });
  };

  filterSentMails(arr: Mail[]): Mail[] {
    return arr.filter((v) => {
      return v.sent;
    })
  }

  filterInboxMails(arr: Mail[]): Mail[] {
    return arr.filter((v) => {
      return !v.sent;
    })
  }

  filterStarredMails(arr: Mail[]): Mail[] {
    return arr.filter((v) => {
      return v.starred;
    })
  }

  //----------------------------------------------------------------

  toggleStarred(id: string): Promise<Mail> {
    let itemIndex: number;
    let item: Mail;
    for (let i = 0; i < this.mails.length; i++) {
      if (this.mails[i]._id === id) {
        itemIndex = i;
        item = Object.assign({}, this.mails[i]);
        break;
      }
    }
    if (item) {
      item.starred = !item.starred;
      return this.mailService.updateMail(item).then((data) => {
        this.mails[itemIndex] = data;
        this.cd.detectChanges();
        return data;
      })
    }
  };

  toggleReadMail(id: string): Promise<Mail> {
    let itemIndex: number;
    let item: Mail;
    for (let i = 0; i < this.mails.length; i++) {
      if (this.mails[i]._id === id) {
        itemIndex = i;
        item = Object.assign({}, this.mails[i]);
        break;
      }
    }
    if (item) {
      item.read = !item.read;
      return this.mailService.updateMail(item).then((data) => {
        this.mails[itemIndex] = data;
        this.cd.detectChanges();
        return data;
      })
    }
  };

  markAsRead(id: string): Promise<Mail> {
    let itemIndex: number;
    let item: Mail;
    for (let i = 0; i < this.mails.length; i++) {
      if (this.mails[i]._id === id) {
        itemIndex = i;
        item = Object.assign({}, this.mails[i]);
        break;
      }
    }
    if (item) {
      item.read = true;
      return this.mailService.updateMail(item).then((data) => {
        this.mails[itemIndex] = data;
        this.cd.detectChanges();
        return data;
      })
    }
  }

  deleteMail(id: string): Promise<Mail> {
    let itemIndex: number;
    for (let i = 0; i < this.mails.length; i++) {
      if (this.mails[i]._id === id) {
        itemIndex = i;
        break;
      }
    }
    return this.mailService.deleteMail(id).then((data) => {
      this.mails.splice(itemIndex, 1);
      this.cd.detectChanges();
      return data;
    });
  };

  sendMail(mail: Mail): Promise<Mail> {
    return this.mailService.sendMail(mail).then((data) => {
      this.mails.push(data);
      this.cd.detectChanges();
      return data;
    })
  };

  deleteMailGroup(): void {
    let promiseArr:any = [];

    this.selectedIds.forEach((v, i) => {
      let prom = this.deleteMail(v).then(() => {
        this.selectedIds.splice(i, 1);
      })
      promiseArr.push(prom);
    });
    Promise.all(promiseArr).then(() => {
      this.selectedIds = [];
    })
  };

  toggleStarredGroup(): void {
    this.selectedIds.forEach((v, i) => {
      this.toggleStarred(v);
    });
  };

  toggleReadGroup(): void {
    this.selectedIds.forEach((v, i) => {
       this.toggleReadMail(v)
    });
  };

  addToSelectedIds(id: string): void {
    if (this.selectedIds.indexOf(id) === -1) {
      this.selectedIds.push(id);
      this.cd.detectChanges();
    } else {
      let ind = this.selectedIds.indexOf(id);
      this.selectedIds.splice(ind, 1);
      this.cd.detectChanges();
    }
  };

  showIfSelected(id: string): boolean {
    if (this.selectedIds.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  getMailTime(ts: number): string {
    let currentDate = new Date(Date.now());
    let mailDate = new Date(ts);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if ((currentDate.getDate() === mailDate.getDate()) && (currentDate.getMonth() === mailDate.getMonth()) && (currentDate.getFullYear() === mailDate.getFullYear())) {
        return `${mailDate.getHours()}:${mailDate.getMinutes()}`
    } else {
      let monthNumber = mailDate.getMonth();
      return `${monthNames[monthNumber]} ${mailDate.getDate()}`
    }
  };

  goToMail(id: string):void {
    this.router.navigate(['/viewmail', id]);
  }
}
