import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {CommonModule} from '@angular/common';

import {TaskItemComponent} from './task-item.component';

import {Task} from '../../shared/TaskObjInterface/task-obj.interface';

describe('TaskItemComponent: ', () => {
  let item: Task;
  let color: string;
  let delitems: string[];
  let showdel: boolean;

  let fixture: ComponentFixture<TaskItemComponent>;
  let comp: TaskItemComponent;

  beforeEach(() => {
    item = {
      _id: {
        $oid: '57b6cd42f466a8d9c0bbb3c0'
      },
      name: 'Item 2',
      tag: 'entertainment',
      description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting atLazi\u2019 Cafe in Amman Jordan',
      favorite: true
    };
    color = 'shipcove';
    delitems = [];
    showdel = false;

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TaskItemComponent]
    });

    fixture = TestBed.createComponent(TaskItemComponent);
    comp = fixture.componentInstance;

    comp.item = item;
    comp.color = color;
    comp.delitems = delitems;
    comp.showdel = showdel;
    comp.update = jasmine.createSpy('update');
    comp.delete = jasmine.createSpy('delete');

    fixture.detectChanges();
  });

  it('shold be created', () => {
    expect(comp instanceof TaskItemComponent).toBe(true, 'should create TaskItemComponent');
  });

  it('element "task-item" should have a class with string equal to comp.color', () => {
    let elemClass = fixture.debugElement.query(By.css('.task-item')).nativeElement.className;

    expect(elemClass.indexOf(comp.color) > -1).toBeTruthy();
  });

  it('element "task-item__name" should have textContent equal to item.name', () => {
    let taskItemNameText = fixture.debugElement.query(By.css('.task-item__name')).nativeElement.textContent;

    expect(taskItemNameText).toEqual(comp.item.name);
  });

  it('element "task-item__tag" should have textContent equal to item.tag', () => {
    let taskItemTagText = fixture.debugElement.query(By.css('.task-item__tag')).nativeElement.textContent;

    expect(taskItemTagText).toEqual(comp.item.tag);
  });

  it('element "task-item__description" should have textContent equal to item.description', () => {
    let taskDescriptionTest = fixture.debugElement.query(By.css('.task-item__description')).nativeElement.textContent;

    expect(taskDescriptionTest).toEqual(comp.item.description);
  });

  it('element "task-item__favorite" should have class "task-item__favorite_is_active" when comp.item.favorite is truthy', () => {
    item.favorite = true;
    fixture.detectChanges();
    let taskItemFavoriteClassStr = fixture.debugElement.query(By.css('.task-item__favorite')).nativeElement.className;

    expect(taskItemFavoriteClassStr.indexOf('task-item__favorite_is_active') > -1).toBeTruthy();
  });

  it('comp.update should be invoked when "task-item__favorite" element is clicked', () => {
    let taskItemFavorite = fixture.debugElement.query(By.css('.task-item__favorite'));
    taskItemFavorite.triggerEventHandler('click', null);

    expect(comp.update).toHaveBeenCalledWith(item._id);
  });
});
