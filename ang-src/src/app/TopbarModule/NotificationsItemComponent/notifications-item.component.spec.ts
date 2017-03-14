import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {NotificationsItemComponent} from './notifications-item.component';

import {RouterLinkStubDirective} from '../../../../testing/router-link-stub.directive';

import {TopbarModule} from '../topbar.module';

describe('NotificationsItemComponent: ', () => {
  let type: string;
  let link: string;
  let quantity: string;

  let fixture: ComponentFixture<NotificationsItemComponent>;
  let comp: NotificationsItemComponent;

  beforeEach(() => {
    type = 'comment';
    link = 'comments';
    quantity = '9';

    TestBed.configureTestingModule({
      declarations: [NotificationsItemComponent, RouterLinkStubDirective]
    });

    fixture = TestBed.createComponent(NotificationsItemComponent);
    comp = fixture.componentInstance;

    comp.type = type;
    comp.link = link;
    comp.quantity = quantity;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof NotificationsItemComponent).toBe(true, 'should create NotificationsItemComponent');
  });

  it('element should have a class with type string interpolated in it', () => {
    fixture.detectChanges();
    let classStr = `.notifications-item_type_${type}`
    let elemNotifItem: HTMLElement = fixture.debugElement.query(By.css(classStr)).nativeElement;

    expect(elemNotifItem).toBeDefined();
  });

  it('element "notifications-item__link" should contain an attribute "routerLink" which value should be equal to link property passed into the component', () => {
    let routerLink = fixture.debugElement.query(By.css('.notifications-item__link')).injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;

    expect(routerLink.linkParams).toEqual(`/${link}`);
  });

  it('element "notifications-item__quantity" should contain an text which should be equal to quantity property passed into the component', () => {
    let notifQuantity = fixture.debugElement.query(By.css('.notifications-item__quantity')).nativeElement.textContent;

    expect(notifQuantity).toEqual(quantity);
  });
});
