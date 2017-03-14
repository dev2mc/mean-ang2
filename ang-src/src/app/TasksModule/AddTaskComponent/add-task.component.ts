import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

let template = require('./add-task.component.html');
let styles = require('./add-task.component.scss');

@Component({
  selector: 'add-task',
  template: template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent {
  @Input() item: Task;
  @Input() tags: string[];

  @Output() onAdded = new EventEmitter<Task>();
  @Output() onHidden = new EventEmitter<boolean>();

  add(task: Task): void {
    let newTask = Object.assign({}, task);
    this.onAdded.emit(newTask);
  }

  hide(): void {
    this.onHidden.emit(false);
  }
}
