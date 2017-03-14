import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CalendarComponent} from './calendar.component';

describe('CalendarComponent: ', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let comp: CalendarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent]
    });

    fixture = TestBed.createComponent(CalendarComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof CalendarComponent).toBe(true, 'should create CalendarComponent');
  });
});
