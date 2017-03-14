import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MenubarItemComponent} from './menubar-item.component';

import {RouterLinkStubDirective} from '../../../../testing/router-link-stub.directive';

describe('MenubarItemComponent: ', () => {
  let icon: string;
  let name: string;
  let link: string;
  let number: string|boolean;
  let collapse: boolean;

  let fixture: ComponentFixture<MenubarItemComponent>;
  let comp: MenubarItemComponent;

  beforeEach(() => {
    icon = 'fa-comment';
    name = 'comment';
    link = 'comments';
    number = '9';
    collapse = false;

    TestBed.configureTestingModule({
      declarations: [
        MenubarItemComponent,
        RouterLinkStubDirective
      ]
    });

    fixture = TestBed.createComponent(MenubarItemComponent);
    comp = fixture.componentInstance;

    comp.icon = icon;
    comp.name = name;
    comp.link = link;
    comp.number = number;
    comp.collapse = collapse;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof MenubarItemComponent).toBe(true, 'should create MenubarItemComponent');
  });

  it('href attribute of the element with class "menubar-item__link" should be equal to comp.link property', () => {
    let routLink = fixture.debugElement.query(By.css('.menubar-item__link')).injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;

    expect(routLink.linkParams).toEqual(`/${comp.link}`);
  });

  it('classname of the element with "class menubar-item__icon" should contain string from comp.icon property', () => {
    let className = fixture.debugElement.query(By.css('.menubar-item__icon')).nativeElement.className;

    expect(className.indexOf(comp.icon) > -1).toBeTruthy();
  });

  it('element with class "menubar-item__name" should contain text equal to comp.name', () => {
    let nameText = fixture.debugElement.query(By.css('.menubar-item__name')).nativeElement.textContent;

    expect(nameText).toEqual(comp.name);
  });

  it('if comp.name equal to false, elemnt with class "menubar-item__badge" should not appear in template', () => {
    comp.number = false;
    fixture.detectChanges();

    let elemNumber = fixture.debugElement.query(By.css('.menubar-item')).nativeElement.querySelector('.menubar-item__badge');

    expect(elemNumber).toEqual(null);
  });

  it('class "menubar-item_view_collapsed" should be added to element "menubar-item" when comp.collapse is truthy', () => {
    let classCollapsedItem = 'menubar-item_view_collapsed';
    comp.collapse = true;
    fixture.detectChanges();

    let elemItemClass = fixture.debugElement.query(By.css('.menubar-item')).nativeElement.className;

    expect(elemItemClass.indexOf(classCollapsedItem) > -1).toBeTruthy();
  });
});
