import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {MailComponent} from './MailComponent/mail.component';
import {ViewMailComponent} from './ViewMailComponent/view-mail.component';
import {ComposeEmailComponent} from './ComposeEmailComponent/compose-email.component';
import {MailListComponent} from './MailListComponent/mail-list.component';

import {MailService} from '../shared/MailService/mail.service';
import {ViewMailResolveService} from '../shared/ViewMailResolveService/view-mail-resolve.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule
  ],
  declarations: [
    MailComponent,
    ViewMailComponent,
    ComposeEmailComponent,
    MailListComponent
  ],
  providers: [
    MailService,
    ViewMailResolveService
  ],
  exports: [MailComponent]
})
export class MailModule {};
