import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {routing} from './app.routing';

import {TopbarModule} from './TopbarModule/topbar.module';
import {MenubarModule} from './MenubarModule/menubar.module';
import {TasksModule} from './TasksModule/tasks.module';
import {DashboardModule} from './DashboardModule/dashboard.module';
import {MailModule} from './MailModule/mail.module';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './shared/404Component/404.component';
import {LoginComponent} from './shared/LoginComponent/login.component';

import {DocumentRefService} from './shared/DocumentRefService/document-ref.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,

    routing,

    TopbarModule,
    MenubarModule,
    TasksModule,
    DashboardModule,
    MailModule
  ],
  providers: [DocumentRefService],
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
