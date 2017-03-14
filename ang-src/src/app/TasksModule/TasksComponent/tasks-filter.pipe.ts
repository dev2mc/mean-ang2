import {Pipe, PipeTransform} from '@angular/core';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

@Pipe({name: 'TasksFilter'})
export class TasksFilterPipe implements PipeTransform {
  transform(inputArr: Task[], tag: string): Task[] {
    if (tag === 'all') {
      return inputArr;
    } else {
      return inputArr.filter((v, i) => {
        return inputArr[i].tag === tag
      })
    }
  }
}
