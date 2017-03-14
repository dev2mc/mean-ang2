import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TodoComponent} from './todo.component';

import {TodoService} from '../../shared/TodoService/todo.service';

import {Todo} from '../../shared/TodoObjInterface/todo-obj.interface';

let todos = [
  {
    _id: {
        $oid: '580f71efbd966f340911f2be'
    },
    description: 'Add items to ToDo List today at 6AM GMT',
    completed: true
  },
  {
    _id: {
        $oid: '580f7216bd966f340911f3f6'
    },
    description: 'Add items to ToDo List today at 6AM GMT',
    completed: false
  },
  {
    _id: {
        $oid: '580f7230c2ef163b0bc51bc6'
    },
    description: 'Add items to ToDo List today at 6AM GMT',
    completed: false
  },
  {
    _id: {
        $oid: '580f7245c2ef163b0bc51c60'
    },
    description: 'Add items to ToDo List today at 6AM GMT',
    completed: false
  }
];

let fakeTask = {
  _id: {
      $oid: 'fgdfgre34123dtew'
  },
  description: 'Test description',
  completed: false
};

let TodoServiceStub = {
  getTodos() {
    return Promise.resolve(todos);
  },

  addTodo(todo: Todo) {
    todo._id = {
      $oid: '3412343wer1243werw'
    };

    return Promise.resolve(todo);
  },

  deleteTodo(id: string) {
    return Promise.resolve(fakeTask);
  },

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;

    return Promise.resolve(todo);
  }
}

describe('TodoComponent: ', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let comp: TodoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule
      ],
      declarations: [
        TodoComponent
      ],
      providers: [
        {provide: TodoService, useValue: TodoServiceStub}
      ]
    });

    fixture = TestBed.createComponent(TodoComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof TodoComponent).toBe(true, 'should create TodoComponent');
  });

  it('ngOnInit method should invoke todoService.getTodos()', () => {
    spyOn(comp, 'getTodos');
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.getTodos).toHaveBeenCalled();
  });

  describe('comp.getTodos: ', () => {
    it('should invoke todoService.getTodos', () => {
      let todoService = fixture.debugElement.injector.get(TodoService);
      spyOn(todoService, 'getTodos').and.callThrough();
      comp.getTodos();
      expect(todoService.getTodos).toHaveBeenCalled();
    });

    it('should fill comp.todos array with item with data from server', fakeAsync(() => {
      comp.todos = [];
      comp.getTodos();
      tick();
      fixture.detectChanges();
      expect(comp.todos.length).toEqual(todos.length);
      expect(comp.todos[comp.todos.length - 1]._id).toEqual(todos[todos.length - 1]._id)
    }));
  });

  describe('comp.addTodo(): ', () => {
    let newTodo: Todo;
    beforeEach(() => {
      newTodo = {
        description: 'New test todo item 12121',
        completed: true
      }
    });

    it('should invoke todoService.addTodo with provided parameter', () => {
      let todoService = fixture.debugElement.injector.get(TodoService);
      spyOn(todoService, 'addTodo').and.callThrough();
      comp.addTodo(newTodo);
      expect(todoService.addTodo).toHaveBeenCalledWith(newTodo);
    });

    it('should add newTodo item to comp.todos array', fakeAsync(() => {
      comp.todos = todos;
      comp.addTodo(newTodo);
      tick();
      fixture.detectChanges();
      expect(comp.todos[comp.todos.length - 1].description).toEqual(newTodo.description);
      expect(comp.todos[comp.todos.length - 1].completed).toEqual(newTodo.completed);
    }));
  });

  describe('comp.deleteTodo(): ', () => {
    let todoId: string;

    beforeEach(() => {
      todoId = todos[todos.length -1]._id;
    })

    it('should invoke todoService with provided parameter', () => {
      let todoService = fixture.debugElement.injector.get(TodoService);
      spyOn(todoService, 'deleteTodo').and.callThrough();
      comp.deleteTodo(todoId);
      expect(todoService.deleteTodo).toHaveBeenCalledWith(todoId);
    });

    it('should remove todo item with provided id from comp.todos array', fakeAsync(() => {
      comp.todos = todos;
      let oldTodosLength = comp.todos.length;
      comp.deleteTodo(todoId);
      tick();
      fixture.detectChanges();
      expect(comp.todos.length).not.toEqual(oldTodosLength);
      expect(comp.todos[comp.todos.length - 1]._id).not.toEqual(todoId);
    }));
  });

  it('comp.resetBoilerplateTodo() method should assign and empty object to comp.boilerplateTodo', () => {
    let emptyTodo = {
      description: '',
      completed: false
    };

    comp.boilerplateTodo = {
      description: 'qqq',
      completed: true
    };

    comp.resetBoilerplateTodo();

    expect(comp.boilerplateTodo).toEqual(emptyTodo);
  });

  it('comp.toggleShowAdd() method should change boolean value of comp.showAdd to opposite one', () => {
    comp.showAdd = false;
    comp.toggleShowAdd();
    expect(comp.showAdd).toEqual(true);
  });

  it('number of items with class ".todo-item" should be equal to comp.todos.length', () => {
    comp.todos = todos;
    fixture.detectChanges();
    let todoItems = fixture.debugElement.query(By.css('.todo')).nativeElement.querySelectorAll('.todo-item');
    expect(todoItems.length).toEqual(comp.todos.length);
  });

  it('element with class "todo__form-container" should not be present when comp.showAdd is falsy', () => {
    comp.showAdd = false;
    fixture.detectChanges();
    let todoForm = fixture.debugElement.query(By.css('.todo')).nativeElement.querySelector('.todo__form-container');
    expect(todoForm).toEqual(null);
  });

  it('element with class "todo__form-container" should be present when comp.showAdd is truthy', () => {
    comp.showAdd = true;
    fixture.detectChanges();
    let todoForm = fixture.debugElement.query(By.css('.todo')).nativeElement.querySelector('.todo__form-container');
    expect(todoForm).toBeDefined();
  });
});
