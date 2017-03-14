import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DashboardModule} from '../dashboard.module';

import {UpdateComponent} from './update.component';

describe('UpdateComponent: ', () => {
  let type: string;
  let data: any;

  let fixture: ComponentFixture<UpdateComponent>;
  let comp: UpdateComponent;

  beforeEach(() => {
    type = 'visitors';
    data = 303;

    TestBed.configureTestingModule({
      imports: [DashboardModule]
    });

    fixture = TestBed.createComponent(UpdateComponent);
    comp = fixture.componentInstance;

    comp.type = type;
    comp.data = data;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof UpdateComponent).toBe(true, 'should create UpdateComponent');
  });

  it('"update__icon" element should have a class containing type variable', () => {
    let className = fixture.debugElement.query(By.css('.update__icon')).nativeElement.className;

    expect(className.indexOf(comp.type) > -1).toBeTruthy();
  });

  it('when comp.type is equal to "visitors" element with class "fa" should have class "fa-user"', () => {
    comp.type = 'visitors';
    fixture.detectChanges();

    let className = fixture.debugElement.query(By.css('.fa')).nativeElement.className;
    expect(className.indexOf('fa-user') > -1).toBeTruthy();
  });

  it('"update__icon-decration" element should have a class containing type variable', () => {
    let className = fixture.debugElement.query(By.css('.update__icon-decration')).nativeElement.className;

    expect(className.indexOf(comp.type) > -1).toBeTruthy();
  });

  it('when comp.type is equal to "visitors" content of element with class "update__description" should be equal to "Today Visitors"', () => {
    let textContent = fixture.debugElement.query(By.css('.update__description')).nativeElement.textContent;

    expect(textContent).toEqual('Today Visitors');
  });
});
