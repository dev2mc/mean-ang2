import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {WeatherComponent} from './weather.component';

describe('WeatherComponent: ', () => {
  let type: string;
  let temperature: number;
  let location: string;

  let fixture: ComponentFixture<WeatherComponent>;
  let comp: WeatherComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent]
    });

    fixture = TestBed.createComponent(WeatherComponent);
    comp = fixture.componentInstance;

    comp.type = 'sunny';
    comp.temperature = 25;
    comp.location = 'texas';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof WeatherComponent).toBe(true, 'should creaet WeatherComponent');
  });

  it('element with class "weather__icon" should have class "fa-sun-o" when comp.type is equal to "sunny"', () => {
    comp.type = 'sunny';
    fixture.detectChanges();
    let className = fixture.debugElement.query(By.css('.weather__icon')).nativeElement.className;

    expect(className.indexOf('fa-sun-o') > -1).toBeTruthy();
  });

  it('element "weather__temperature" should contain comp.temperature', () => {
    let textContent = fixture.debugElement.query(By.css('.weather__temperature')).nativeElement.textContent;

    expect(textContent.indexOf(comp.temperature + '') > -1).toBe(true)
  });

  it('element "weather__location" should contain comp.locations', () => {
    let textContent = fixture.debugElement.query(By.css('.weather__location')).nativeElement.textContent;

    expect(textContent.indexOf(comp.location) > -1).toBeTruthy();
  });

  it('element "weather__weather" should contain comp.type', () => {
    let textContent = fixture.debugElement.query(By.css('.weather__weather')).nativeElement.textContent;

    expect(textContent.indexOf(comp.type) > -1).toBeTruthy();
  });
});
