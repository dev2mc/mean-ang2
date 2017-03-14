import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ChangeDetectionStrategy, trigger, state, style, transition, animate} from '@angular/core';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

let template = require('./task-item.component.html');
let styles = require('./task-item.component.scss');

@Component({
  selector: 'task-item',
  template: template,
  styles: [styles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('inOut', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 10 ease-out', style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class TaskItemComponent {
  @Input() item: Task;
  @Input() color: string;
  @Input() delitems: string[];
  @Input() showdel: boolean;

  @Output() onUpdated = new EventEmitter<string>();
  @Output() onDeleted = new EventEmitter<string>();

  update(id: string):void {
    this.onUpdated.emit(id);
  }

  delete(id: string): void {
    this.onDeleted.emit(id);
  }
}
