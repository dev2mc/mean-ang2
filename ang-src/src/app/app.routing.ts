import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TasksComponent} from './TasksModule/TasksComponent/tasks.component';
import {DashboardComponent} from './DashboardModule/DashboardComponent/dashboard.component';
import {MailComponent} from './MailModule/MailComponent/mail.component';
import {NotFoundComponent} from './shared/404Component/404.component';
import {ViewMailComponent} from './MailModule/ViewMailComponent/view-mail.component';
import {ComposeEmailComponent} from './MailModule/ComposeEmailComponent/compose-email.component';

import {ViewMailResolveService} from './shared/ViewMailResolveService/view-mail-resolve.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'mail',
    component: MailComponent
  },
  {
    path: 'composeemail/:id',
    component: ComposeEmailComponent
  },
  {
    path: 'viewmail/:id',
    component: ViewMailComponent,
    resolve: {
      mailItem: ViewMailResolveService
    }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
