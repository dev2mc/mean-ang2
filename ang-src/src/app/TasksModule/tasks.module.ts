import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule}   from '@angular/forms';

import {TasksService} from '../shared/TasksService/tasks.service';
import {TasksFilterPipe} from './TasksComponent/tasks-filter.pipe';

import {TasksComponent} from './TasksComponent/tasks.component';
import {TaskItemComponent} from './TaskItemComponent/task-item.component';
import {AddTaskComponent} from './AddTaskComponent/add-task.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  declarations: [
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,

    TasksFilterPipe
  ],
  providers: [TasksService],
  exports: [TasksComponent]
})
export class TasksModule {};
