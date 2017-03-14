import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {TopbarComponent} from './TopbarComponent/topbar.component';
import {SearchComponent} from './SearchComponent/search.component';
import {NotificationsComponent} from './NotificationsComponent/notifications.component';
import {NotificationsItemComponent} from './NotificationsItemComponent/notifications-item.component';
import {ProfileComponent} from './ProfileComponent/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TopbarComponent,
    SearchComponent,
    NotificationsComponent,
    NotificationsItemComponent,
    ProfileComponent
  ],
  exports: [
    TopbarComponent,
    SearchComponent,
    NotificationsComponent,
    NotificationsItemComponent,
    ProfileComponent
  ]
})
export class TopbarModule {};
