import {Component, OnInit} from '@angular/core';

interface NotifItem {
  type: string,
  link: string,
  quantity: number
}

@Component({
  selector: 'notifications',
  template: `
    <div class="notifications">
      <notifications-item *ngFor='let item of notificationsData' [type]='item.type' [link]='item.link' [quantity]='item.quantity'></notifications-item>
    </div>
  `,
  styles: [`
    .notifications {
      display: flex;
    }
  `]
})
export class NotificationsComponent implements OnInit {
  notificationsData: NotifItem[];

  constructor(){};

  ngOnInit(): void {
    this.notificationsData = [
      {
        type: 'comment',
        link: 'comments',
        quantity: 9
      },
      {
        type: 'email',
        link: 'mail',
        quantity: 1
      }
    ];
  }
}
