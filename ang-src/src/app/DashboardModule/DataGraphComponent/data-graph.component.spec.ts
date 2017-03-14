import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {DataGraphComponent} from './data-graph.component';

describe('DataGraphComponent: ', () => {
  let earnings: number;

  let fixture: ComponentFixture<DataGraphComponent>;
  let comp: DataGraphComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGraphComponent]
    });

    fixture = TestBed.createComponent(DataGraphComponent);
    comp = fixture.componentInstance;

    comp.earnings = 500;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof DataGraphComponent).toBe(true, 'should create DataGraphComponent');
  });

  it('element with class "data-graph__money" should contain text comp.earnings', () => {
    let textContent = fixture.debugElement.query(By.css('.data-graph__money')).nativeElement.textContent;

    expect(textContent.indexOf(comp.earnings + '') > -1).toBeTruthy();
  });
});
