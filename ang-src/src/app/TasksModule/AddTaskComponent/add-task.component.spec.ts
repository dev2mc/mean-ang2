import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';

import {AddTaskComponent} from './add-task.component';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

describe('AddTaskComponent: ', () => {
  let item: Task;
  let itemCompleted: Task;
  let tags: string[];

  let fixture: ComponentFixture<AddTaskComponent>;
  let comp: AddTaskComponent;

  beforeEach(() => {
    item = {
      name: '',
      tag: '',
      description: '',
      favorite: false
    };

    itemCompleted = {
      name: 'test name',
      tag: 'tag3',
      description: 'test description',
      favorite: false
    };

    tags = ['tag1', 'tag2', 'tag3'];

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule
      ],
      declarations: [AddTaskComponent]
    });

    fixture = TestBed.createComponent(AddTaskComponent);
    comp = fixture.componentInstance;

    comp.item = item;
    comp.tags = tags;
    comp.hide = jasmine.createSpy('hide');
    comp.add = jasmine.createSpy('add');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof AddTaskComponent).toBe(true, 'should create AddItemComponent')
  });

  it('when "add-item__close" element is clicked comp.hide should be invoked', () => {
    let addItemClose = fixture.debugElement.query(By.css('.add-item__close'));
    addItemClose.triggerEventHandler('click', null);
    expect(comp.hide).toHaveBeenCalled();
  });

  it('when "add-item__button_for_close" element is clicked comp.hide should be invoked', () => {
    let buttonClose = fixture.debugElement.query(By.css('.add-item__button_for_close'));
    buttonClose.triggerEventHandler('click', null);
    expect(comp.hide).toHaveBeenCalled();
  });

  it('when "add-item__button_for_save" element is clicked comp.add should be invoked with parameter equal to itemCompleted', () => {
    comp.item = itemCompleted;
    fixture.detectChanges();
    let buttonAdd = fixture.debugElement.query(By.css('.add-item__button_for_save'));
    buttonAdd.triggerEventHandler('click', null);
    expect(comp.add).toHaveBeenCalledWith(itemCompleted);
  });
});
