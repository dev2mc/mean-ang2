import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {ProfileViewComponent} from './ProfileViewComponent/profile-view.component';
import {ProfileChangeComponent} from './ProfileChangeComponent/profile-change.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule
  ],
  declarations: [
    ProfileViewComponent,
    ProfileChangeComponent
  ],
  exports: [
    ProfileViewComponent,
    ProfileChangeComponent
  ]
})
export class ProfileModule {};
