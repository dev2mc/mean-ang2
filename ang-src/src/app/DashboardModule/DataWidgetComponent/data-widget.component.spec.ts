import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DataWidgetComponent} from './data-widget.component';

describe('DataWindegComponent: ', () => {
  let type: string;
  let max: number;
  let count: number;

  let fixture: ComponentFixture<DataWidgetComponent>;
  let comp: DataWidgetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataWidgetComponent]
    });

    fixture = TestBed.createComponent(DataWidgetComponent);
    comp = fixture.componentInstance;

    comp.type = 'hosting';
    comp.max = 200;
    comp.count = 100;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof DataWidgetComponent).toBe(true, 'should create DataWidgetComponent');
  });

  it('element with class "data-widget__data" should have class containing comp.type variable', () => {
    let dataWidgetData = fixture.debugElement.query(By.css('.data-widget__data')).nativeElement.className;

    expect(dataWidgetData.indexOf(comp.type) > -1).toBeTruthy();
  });

  it('element with class "data-widget__description" should contain provided text', () => {
    let text = 'From your hosting usage';

    let textContent = fixture.debugElement.query(By.css('.data-widget__description')).nativeElement.textContent;

    expect(textContent).toEqual(text);
  });

  it('element with class "data-widget__line" should have comp.type variable in its class name', () => {
    let className = fixture.debugElement.query(By.css('.data-widget__line')).nativeElement.className;

    expect(className.indexOf(comp.type) > -1).toBeTruthy();
  });
});
