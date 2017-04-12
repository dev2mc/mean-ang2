import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/AuthService/auth.service';

interface NotifItem {
  type: string,
  link: string,
  quantity: number
}

@Component({
  selector: 'notifications',
  template: `
    <div class="notifications">
      <notifications-item [type]='"comment"' [link]='"comments"' [quantity]='9'></notifications-item>
      <notifications-item [type]='"email"' [link]='"mail"' [quantity]='mailsNumber'></notifications-item>
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
  mailsNumber: Number = 0;

  constructor(
    private authService: AuthService
  ){};

  ngOnInit(): void {
    this.authService.getProfile()
    .then(data => {
      this.mailsNumber = data.emailsUnread;
    })
  }
}
