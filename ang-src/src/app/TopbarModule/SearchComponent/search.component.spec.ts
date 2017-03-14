import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SearchComponent} from './search.component';


describe('Search Component: ', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let comp: SearchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    });

    fixture = TestBed.createComponent(SearchComponent);
    comp = fixture.componentInstance;
  })

  it('should be created', () => {
    expect(comp instanceof SearchComponent).toBe(true, 'should create SearchComponent');
  });

  it('should contain element with class "search__form"', () => {
    let elemSearchForm: HTMLElement = fixture.debugElement.query(By.css('.search__form')).nativeElement;

    expect(elemSearchForm).toBeDefined();
  });

  it('should contain element with class "search__input"', () => {
    let elemSearchInput: HTMLElement = fixture.debugElement.query(By.css('.search__input')).nativeElement;

    expect(elemSearchInput).toBeDefined();
  });

  it('should contain element with class "search__submit"', () => {
    let elemSearchSubmit: HTMLElement = fixture.debugElement.query(By.css('.search__submit')).nativeElement;

    expect(elemSearchSubmit).toBeDefined();
  });

  describe('when showMobInput property is truthy: ', () => {
    beforeEach(() => {
      fixture.detectChanges();
      comp.showMobInput = true;
      fixture.detectChanges();
    })

    it('element with class "search__form_device_mob" should appear', () => {
      let elemSearchFormMobile: HTMLElement = fixture.debugElement.query(By.css('.search__form_device_mob')).nativeElement;

      expect(elemSearchFormMobile).toBeDefined();
    });

    it('element with class "search__show-mob" should appear', () => {
      let elemSearchShowMob: HTMLElement = fixture.debugElement.query(By.css('.search__show-mob')).nativeElement;

      expect(elemSearchShowMob).toBeDefined();
    })
    

    it('element with class "search__input_device_mob" should appear', () => {
      let elemSearchInputMob: HTMLElement = fixture.debugElement.query(By.css('.search__input_device_mob')).nativeElement;

      expect(elemSearchInputMob).toBeDefined();
    })
  });
});
