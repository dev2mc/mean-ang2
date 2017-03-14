import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MenubarComponent} from './menubar.component';
import {MenubarItemComponent} from '../MenubarItemComponent/menubar-item.component';

import {WindowRefService} from '../../shared/WindowRefService/window-ref.service';

import {RouterLinkStubDirective} from '../../../../testing/router-link-stub.directive';

let WindowRefServiceStub = {
  nativeWindow: {
    addEventListener: jasmine.createSpy('addEventListener')
  }
}

describe('MenubarComponent: ', () => {
  let fixture: ComponentFixture<MenubarComponent>;
  let comp: MenubarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenubarComponent,
        MenubarItemComponent,
        RouterLinkStubDirective
      ],
      providers: [{provide: WindowRefService, useValue: WindowRefServiceStub}]
    });

    fixture = TestBed.createComponent(MenubarComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof MenubarComponent).toBe(true, 'should create MenubarComponent');
  });

  it('after components initialization "resizeMenubar" should be called', () => {
    spyOn(comp, 'resizeMenubar');
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.resizeMenubar).toHaveBeenCalled();
  });

  it('when comp.collapsed is truthy "menubar_is_collapsed" should be added to menubar element', () => {
    comp.collapsed = true;
    fixture.detectChanges();

    let neededClass = 'menubar_is_collapsed';
    let elemMenubarClass = fixture.debugElement.query(By.css('.menubar')).nativeElement.className;

    expect(elemMenubarClass.indexOf(neededClass) > -1).toBeTruthy();
  });

  it('quantity of elements with "menubar-item" should be equal to quantity of element in comp.menuDataArr', () => {
    let menubarItems: HTMLElement[] = fixture.debugElement.query(By.css('.menubar')).nativeElement.querySelectorAll('.menubar-item');

    expect(menubarItems.length).toEqual(comp.menuDataArr.length);
  });
});
