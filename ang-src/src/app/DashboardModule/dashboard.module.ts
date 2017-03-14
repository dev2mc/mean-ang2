import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {ChartsModule} from 'ng2-charts/ng2-charts';

import {DashboardComponent} from './DashboardComponent/dashboard.component';
import {UpdateComponent} from './UpdateComponent/update.component';
import {YearlySalesComponent} from '../shared/YearlySalesComponent/yearly-sales.component';
import {WeatherComponent} from './WeatherComponent/weather.component';
import {DataWidgetComponent} from './DataWidgetComponent/data-widget.component';
import {NotificationsWidgetComponent} from './NotificationsWidgetComponent/notifications-widget.component';
import {DataGraphComponent} from './DataGraphComponent/data-graph.component';
import {CalendarComponent} from './CalendarComponent/calendar.component';
import {TodoComponent} from './TodoComponent/todo.component';
import {ChartStatsComponent} from './ChartStatsComponent/chart-stats.component';

import {TodoService} from '../shared/TodoService/todo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    UpdateComponent,
    YearlySalesComponent,
    WeatherComponent,
    DataWidgetComponent,
    NotificationsWidgetComponent,
    DataGraphComponent,
    CalendarComponent,
    TodoComponent,
    ChartStatsComponent
  ],
  providers: [
    TodoService
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {};
