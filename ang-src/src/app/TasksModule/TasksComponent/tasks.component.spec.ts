import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TasksComponent} from './tasks.component';
import {AddTaskComponent} from '../AddTaskComponent/add-task.component';
import {TaskItemComponent} from '../TaskItemComponent/task-item.component';

import {TasksFilterPipe} from './tasks-filter.pipe';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';
import {TasksService} from '../../shared/TasksService/tasks.service';

import {TasksModule} from '../tasks.module';

let tasks = [
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3bf'
    },
    name: 'Item 1',
    tag: 'work',
    description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: false
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c0'
    },
    name: 'Item 2',
    tag: 'entertainment',
    description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: true
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c1'
    },
    name: 'Item 3',
    tag: 'work',
    description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: true
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c2'
    },
    name: 'Item 4',
    tag: 'shopping',
    description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: false
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c3'
    },
    name: 'Item 5',
    tag: 'work',
    description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: false
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c4'
    },
    name: 'Item 6',
    tag: 'home',
    description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: true
  },
  {
    _id: {
      $oid: '57b6cd42f466a8d9c0bbb3c5'
    },
    name: 'Item 7',
    tag: 'shopping',
    description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi\u2019 Cafe in Amman Jordan',
    favorite: false
  }
];

let fakeTask = {
  _id: {
    $oid: 'fgsdfgdfgadstr45234'
  },
  name: 'test name',
  tag: 'test',
  description: 'test description',
  favorite: false
};

let TasksServiceStub = {
  getTasks() {
    return Promise.resolve(tasks);
  },

  addTask(task: Task) {
    task._id = {
      $oid: '3838383ueueudjdj'
    };

    return Promise.resolve(task);
  },

  updateTask(task: Task) {
    return Promise.resolve(fakeTask);
  },

  deleteTask(id: string) {
    return Promise.resolve(fakeTask);
  }
}

describe('TasksComponent: ', () => {
  let fixture: ComponentFixture<TasksComponent>;
  let comp: TasksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksModule
      ],
      providers: [{provide: TasksService, useValue: TasksServiceStub}]
    });

    fixture = TestBed.createComponent(TasksComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof TasksComponent).toBe(true, 'should create TasksComponent');
  });

  describe('ngOnInit() method: ', () => {
    it('when called should invoke comp.getTasks()', () => {
      spyOn(comp, 'getTasks').and.callThrough();
      comp.ngOnInit();
      fixture.detectChanges();
      expect(comp.getTasks).toHaveBeenCalled();
    });

    it('when called it should invoke comp.getTasks() which when its promise is resolved should call comp.generateRandomColors() and comp.getTags()', fakeAsync(() => {
      spyOn(comp, 'getTags');
      spyOn(comp, 'generateRandomColors');
      comp.ngOnInit();
      tick();
      tick(5);
      fixture.detectChanges();
      expect(comp.getTags).toHaveBeenCalled();
      expect(comp.generateRandomColors).toHaveBeenCalled();
    }));
  });

  describe('comp.getTasks() method: ', () => {
    it('when invoked it should call tasksService.getTasks() method', () => {
      let tasksService = fixture.debugElement.injector.get(TasksService);
      spyOn(tasksService, 'getTasks').and.callThrough();
      comp.getTasks();
      expect(tasksService.getTasks).toHaveBeenCalled();
    });

    it('when invoked it should fill comp.tasks with data obtained from tasksService.getTasks', fakeAsync(() => {
      comp.tasks = [];
      comp.getTasks();
      tick();
      fixture.detectChanges();
      expect(comp.tasks.length).toEqual(tasks.length);
    }));
  });

  describe('comp.addTask() method: ', () => {
    let testTask: Task;

    beforeEach(() => {
      testTask = {
        name: 'test name',
        tag: 'test',
        description: 'test description',
        favorite: false
      };
    })

    it('should invoke tasksSerivce.addTask() method', () => {
      let tasksService = fixture.debugElement.injector.get(TasksService);

      spyOn(tasksService, 'addTask').and.callThrough();
      comp.addTask(testTask);

      expect(tasksService.addTask).toHaveBeenCalledWith(testTask);
    });

    it('should add task item return from tasksService.addTask promise to comp.tasks', fakeAsync(() => {
      comp.tasks = tasks;
      comp.addTask(testTask);
      tick();
      fixture.detectChanges();

      expect(comp.tasks[comp.tasks.length - 1].name).toEqual(testTask.name);
      expect(comp.tasks[comp.tasks.length - 1].tag).toEqual(testTask.tag);
      expect(comp.tasks[comp.tasks.length - 1].description).toEqual(testTask.description);
      expect(comp.tasks[comp.tasks.length - 1].favorite).toEqual(testTask.favorite);
    }));

    it('should inivoke comp.addRandomColor(), comp.getTags() and comp.newItemReset() when tasksService.addTask promise resolved', fakeAsync(() => {
      spyOn(comp, 'addRandomColor');
      spyOn(comp, 'getTags');
      spyOn(comp, 'newItemReset');
      comp.addTask(testTask);
      tick();

      expect(comp.addRandomColor).toHaveBeenCalled();
      expect(comp.getTags).toHaveBeenCalled();
      expect(comp.newItemReset).toHaveBeenCalled();
    }));
  });

  describe('comp.updateTask() method: ', () => {
    let testId: string;

    let taskIndex: number;

    beforeEach(() => {
      comp.tasks = tasks;

      taskIndex = comp.tasks.length - 1;
      testId = comp.tasks[taskIndex]._id;
    });

    it('should invoke tasksService.updateTask with task object which is equal to id provided to the function', () => {
      let tasksService = fixture.debugElement.injector.get(TasksService);
      let updatedTask = comp.tasks[taskIndex];
      updatedTask.favorite = !updatedTask.favorite;

      spyOn(tasksService, 'updateTask').and.callThrough();
      comp.updateTask(testId);

      expect(tasksService.updateTask).toHaveBeenCalledWith(updatedTask);
    });

    it('should change favorite property of tasks id of which is provided to the method', fakeAsync(() => {
      let testFav = comp.tasks[taskIndex].favorite
      comp.updateTask(testId);
      tick();

      expect(comp.tasks[taskIndex].favorite).toEqual(!testFav);
    }));
  });

  describe('comp.deleteTask() method: ', () => {
    it('when called should invoke tasksService.deleteTask with provided id parameter', () => {
      let id = '57b6cd42f466a8d9c0bbb3c5';
      let tasksService = fixture.debugElement.injector.get(TasksService);
      spyOn(tasksService, 'deleteTask').and.callThrough();
      comp.deleteTask(id);

      expect(tasksService.deleteTask).toHaveBeenCalledWith(id);
    });

    it('should remove task item with provided id from comp.tasks array', fakeAsync(() => {
      comp.tasks = tasks;
      let id = comp.tasks[0]._id;
      let length = comp.tasks.length;
      comp.deleteTask(id);
      tick();

      expect(comp.tasks.length).toEqual(length - 1);
      expect(comp.tasks[0]._id).not.toEqual(id);
    }));
  });

  describe('comp.addToDelete() method: ', () => {
    let testId: string;

    beforeEach(() => {
      testId = '34523453245';
    });

    it('should add provided id to comp.tasksToDelete array', () => {
      comp.tasksToDelete = ['342342342342342'];
      comp.addToDelete(testId);

      expect(comp.tasksToDelete[comp.tasksToDelete.length - 1]).toEqual(testId);
    });

    it('should remove provided id if it is an element of comp.tasksToDelete', () => {
      comp.tasksToDelete = ['342342342342342', '34523453245'];
      comp.addToDelete(testId);

      expect(comp.tasksToDelete.indexOf(testId) === -1).toBeTruthy();
    });
  });

  it('comp.deleteMultipleTasks() method should call comp.deleteTask() from comp.tasksToDelete.length times', () => {
    comp.tasksToDelete = ['342342342342342', '34523453245', '432343242432', '342342342342'];

    comp.deleteTask = jasmine.createSpy('deleteTask');
    comp.deleteMultipleTasks();
    expect(comp.deleteTask).toHaveBeenCalled();
    // expect(comp.deleteTask.calls.count()).toEqual(comp.tasksToDelete.length)
  });

  describe('comp.toggleShowAddItem() method: ', () => {
    it('should change boolean value of comp.showAddItem to opposite one', () => {
      comp.showAddItem = false;
      comp.toggleShowAddItem();
      expect(comp.showAddItem).toBeTruthy();
    });

    it('method call comp.newItemReset() method', () => {
      spyOn(comp, 'newItemReset');
      comp.toggleShowAddItem();
      expect(comp.newItemReset).toHaveBeenCalled();
    });
  });

  it('comp.newItemReset() should reset comp.newItemBoilerplate to empty object', () => {
    let emptyTaskObj = {
      name: '',
      tag: '',
      description: '',
      favorite: false
    };

    comp.newItemBoilerplate = {
      name: 'test name',
      tag: 'test',
      description: 'test description',
      favorite: false
    };

    comp.newItemReset();

    expect(comp.newItemBoilerplate).toEqual(emptyTaskObj);
  });

  describe('comp.getTags() method: ', () => {
    beforeEach(() => {
      comp.tasks = tasks;
    })

    it('should add "all" tag to comp.tags as first element', () => {
      comp.getTags();
      expect(comp.tags[0]).toEqual('all');
    });

    it('should add tags from comp.tasks to comp.tags array', () => {
      comp.getTags();
      expect(comp.tags[0 + 1]).toEqual(comp.tasks[0].tag)
    });
  });

  it('comp.resetTasksToDel method should made comp.tasksToDelete arrya empty', () => {
    comp.tasksToDelete = ['sldkfjsda;lk', 'dsfsadfs', 'dsfasdfsadfsa'];
    comp.resetTasksToDel();

    expect(comp.tasksToDelete).toEqual([]);
  });

  it('comp.randomColor() method shold return a random color from comp.colors array', () => {
    comp.colors = ['red', 'white', 'green', 'blue', 'yellow'];
    expect(comp.colors.indexOf(comp.randomColor()) > - 1).toBeTruthy();
    expect(comp.colors.indexOf(comp.randomColor()) > - 1).toBeTruthy();
    expect(comp.colors.indexOf(comp.randomColor()) > - 1).toBeTruthy();
  });

  describe('comp.generateRandomColors() method: ', () => {
    beforeEach(() => {
      comp.tasks = tasks;
    });

    it('should invoke comp.randomColor()', () => {
      spyOn(comp, 'randomColor');
      comp.generateRandomColors();
      expect(comp.randomColor).toHaveBeenCalled()
    });

    it('comp.generateRandomColors() method should generate an array of random colors which length is equal to the lenght of comp.tasks array', () => {
      comp.colors = ['red', 'white', 'green', 'blue', 'yellow'];
      comp.generateRandomColors();
      expect(comp.randomColors.length).toEqual(comp.tasks.length);
    });
  });

  describe('comp.addRandomColor() method: ', () => {
    beforeEach(() => {
      comp.colors = ['yellow', 'green', 'black'];
      comp.randomColors = ['red', 'white', 'blue'];
    });

    it('shold invoke comp.randomColor() method', () => {
      spyOn(comp, 'randomColor');
      comp.addRandomColor();
      expect(comp.randomColor).toHaveBeenCalled();
    });

    it('should add new item to comp.randomColors array', () => {
      let randColLength = comp.randomColors.length;
      comp.addRandomColor();
      expect(comp.randomColors.length).toEqual(randColLength + 1);
    });
  });

  describe('comp.deleteRandomColor() method: ', () => {
    beforeEach(() => {
      comp.tasks = tasks;
      comp.colors = ['yellow', 'green', 'black', 'red', 'white', 'blue'];
      comp.generateRandomColors();
    });

    it('should remove color item from comp.randomColors according to id from task item', () => {
      let taskId = comp.tasks[comp.tasks.length - 1]._id;
      let randColLengthOld = comp.randomColors.length;
      comp.deleteRandomColor(taskId);
      expect(comp.randomColors.length).toEqual(randColLengthOld - 1);
    });
  });
});
