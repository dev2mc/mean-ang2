import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

let uniq = require('lodash.uniq');

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

import {TasksService} from '../../shared/TasksService/tasks.service';

let template = require('./tasks.component.html');
let styles = require('./tasks.component.scss');

@Component({
  selector: 'tasks',
  template: template,
  styles: [styles]
})
export class TasksComponent implements OnInit {
  newItemBoilerplate: Task = {
    name: '',
    tag: '',
    description: '',
    favorite: false
  };
  colors: string[] = ['shipcove', 'cornflowerblue', 'saffronmango', 'wisteria', 'sunsetorange', 'bermuda', 'sunglow', 'java', 'mantis'];
  currentTag: string = 'all';
  showAddItem: boolean = false;
  showDelete: boolean = false;
  tasksToDelete: string[] = [];
  tasks: Task[] = [];
  tags: string[] = [];
  randomColors: string[] = [];

  constructor(private tasksService: TasksService, private cd: ChangeDetectorRef) {};

  ngOnInit(): void {
    this.getTasks().then(() => {
      this.generateRandomColors();
      this.getTags();
      setTimeout(()=>{
        this.cd.detectChanges();
      }, 1);
    });
  };

  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks().then((data: Task[]) => {
      this.tasks = data
      return this.tasks;
    });
  };

  addTask(task: Task): Promise<Task> {
    return this.tasksService.addTask(task).then(data => {
      this.tasks.push(data);
      this.addRandomColor();
      this.getTags();
      this.newItemReset();
      this.cd.detectChanges();
      return data;
    });
  };

  updateTask(id: string): Promise<void> {
    let updatedTask: Task;
    let updatedTaskInd: number;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i]._id === id) {
        updatedTask = Object.assign({}, this.tasks[i]);
        updatedTask.favorite = !updatedTask.favorite;
        updatedTaskInd = i;
        break;
      }
    }

    if (updatedTask) {
      return this.tasksService.updateTask(updatedTask).then((data: Task) => {
        this.tasks[updatedTaskInd] = Object.assign({}, data);
        this.cd.detectChanges();
      });
    }
  };

  deleteTask(id: string): Promise<Task> {
    return this.tasksService.deleteTask(id).then((data) => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i]._id === id) {
          this.tasks.splice(i, 1);
          break;
        }
      }
      this.deleteRandomColor(id);
      this.getTags();
      this.tasksToDelete.splice(this.tasksToDelete.indexOf(id), 1);
      this.cd.detectChanges();
      return data;
    });
  };

  addToDelete(id: string): void {
    if (this.tasksToDelete.indexOf(id) === -1) {
      this.tasksToDelete.push(id);
    } else if (this.tasksToDelete.indexOf(id) > -1) {
      this.tasksToDelete.splice(this.tasksToDelete.indexOf(id), 1);
    }
  };

  deleteMultipleTasks(): void {
    this.tasksService.deleteMultipleTasks(this.tasksToDelete).then((data)=>{
      this.tasksToDelete = [];

      this.getTasks().then(() => {
        this.generateRandomColors();
        this.getTags();
        setTimeout(()=>{
          this.cd.detectChanges();
        }, 1);
      });
    })
  };

  toggleShowAddItem(): void {
    this.showAddItem = !this.showAddItem;
    this.newItemReset();
  };

  newItemReset(): void {
    this.newItemBoilerplate = {
      name: '',
      tag: '',
      description: '',
      favorite: false
    };
  };

  getTags(): void {
    this.tags = uniq(this.tasks.map((v) => v.tag));
    this.tags.unshift('all');
  };

  resetTasksToDel(): void {
    this.tasksToDelete = [];
  }

  randomColor(): string {
    let num = Math.floor(Math.random() * (this.colors.length));
    return this.colors[num];
  };

  generateRandomColors(): void {
    this.randomColors = this.tasks.map(() => this.randomColor());
  };

  addRandomColor(): void {
    this.randomColors.push(this.randomColor());
  };

  deleteRandomColor(id: string): void {
    let index: number;
    for(let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i]._id === id) {
        index = i;
        break;
      }
    }
    this.randomColors.splice(index, 1);
  };
};
