import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {routing} from './app.routing';

import {TopbarModule} from './TopbarModule/topbar.module';
import {MenubarModule} from './MenubarModule/menubar.module';
import {TasksModule} from './TasksModule/tasks.module';
import {DashboardModule} from './DashboardModule/dashboard.module';
import {MailModule} from './MailModule/mail.module';
import {ProfileModule} from './ProfileModule/profile.module';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './shared/404Component/404.component';
import {LoginComponent} from './shared/LoginComponent/login.component';
import {RegisterComponent} from './shared/RegisterComponent/register.component';
// import {ProfileViewComponent} from './shared/ProfileViewComponent/profile-view.component';

import {DocumentRefService} from './shared/DocumentRefService/document-ref.service';
import {AuthService} from './shared/AuthService/auth.service';

import {AuthGuard} from  './guards/AuthGuard/auth.guard';
import {LoginGuard} from  './guards/LoginGuard/login.guard';

import { FlashMessagesModule } from 'angular2-flash-messages/module';

@NgModule({
  imports: [
    FlashMessagesModule,

    BrowserModule,
    CommonModule,
    FormsModule,

    routing,

    TopbarModule,
    MenubarModule,
    TasksModule,
    DashboardModule,
    MailModule,
    ProfileModule
  ],
  providers: [
    DocumentRefService,
    AuthService,
    AuthGuard,
    LoginGuard
    ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
