import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MenubarComponent} from './MenubarComponent/menubar.component';
import {MenubarItemComponent} from './MenubarItemComponent/menubar-item.component';

import {WindowRefService} from '../shared/WindowRefService/window-ref.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenubarComponent,
    MenubarItemComponent
  ],
  providers: [WindowRefService],
  exports: [MenubarComponent]
})
export class MenubarModule {};
