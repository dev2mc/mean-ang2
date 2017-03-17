import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TasksComponent} from './TasksModule/TasksComponent/tasks.component';
import {DashboardComponent} from './DashboardModule/DashboardComponent/dashboard.component';
import {MailComponent} from './MailModule/MailComponent/mail.component';
import {ViewMailComponent} from './MailModule/ViewMailComponent/view-mail.component';
import {ComposeEmailComponent} from './MailModule/ComposeEmailComponent/compose-email.component';

import {NotFoundComponent} from './shared/404Component/404.component';
import {LoginComponent} from './shared/LoginComponent/login.component';

import {ViewMailResolveService} from './shared/ViewMailResolveService/view-mail-resolve.service';

import {AuthGuard} from './guards/AuthGuard/auth.guard';

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'mail',
    component: MailComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'composeemail/:id',
    component: ComposeEmailComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'viewmail/:id',
    component: ViewMailComponent,
    resolve: {
      mailItem: ViewMailResolveService
    },
    canActivate:[AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/404',
    canActivate:[AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
