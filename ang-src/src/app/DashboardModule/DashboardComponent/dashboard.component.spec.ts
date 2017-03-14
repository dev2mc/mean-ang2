import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DashboardModule} from '../dashboard.module';

import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent: ', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let comp: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardModule]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof DashboardComponent).toBe(true, 'should create MenubarComponent')
  });

  it('there shoudl be 4 ".update" elements', () => {
    let updateEls = fixture.debugElement.query(By.css('.dashboard')).nativeElement.querySelectorAll('.update');

    expect(updateEls.length).toEqual(4);
  });

  it('element ".yearly-sales" should be present', () => {
    let yearlySales = fixture.debugElement.query(By.css('.yearly-sales')).nativeElement;

    expect(yearlySales).toBeDefined();
  });

  it('element ".weather" should be present', () => {
    let weather = fixture.debugElement.query(By.css('.weather')).nativeElement;

    expect(weather).toBeDefined();
  });

  it('elements with class "data-widget" should be present', () => {
    let dataWidgets = fixture.debugElement.query(By.css('.dashboard')).nativeElement.querySelectorAll('.data-widget');

    expect(dataWidgets.length).toEqual(2)
  });

  it('element ".notifications-widget" should be present', () => {
    let widget = fixture.debugElement.query(By.css('.notifications-widget')).nativeElement;

    expect(widget).toBeDefined();
  });

  it('element ".calendar" should be present', () => {
    let calendar = fixture.debugElement.query(By.css('.calendar')).nativeElement;

    expect(calendar).toBeDefined();
  });

  it('element with class ".todo" should be present', () => {
    let todo = fixture.debugElement.query(By.css('.todo')).nativeElement;

    expect(todo).toBeDefined();
  });

  it('element with class "chart-stats" should be present', () => {
    let chart = fixture.debugElement.query(By.css('.chart-stats')).nativeElement;

    expect(chart).toBeDefined();
  });
});
