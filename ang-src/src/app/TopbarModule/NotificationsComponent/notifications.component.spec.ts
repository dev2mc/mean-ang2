import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {NotificationsComponent} from './notifications.component';
import {NotificationsItemComponent} from '../NotificationsItemComponent/notifications-item.component';

import {RouterLinkStubDirective} from '../../../../testing/router-link-stub.directive';

describe('NotificationsComponent: ', () => {
  let fixture: ComponentFixture<NotificationsComponent>;
  let comp: NotificationsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationsComponent,
        NotificationsItemComponent,
        RouterLinkStubDirective
      ]
    })

    fixture = TestBed.createComponent(NotificationsComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(comp instanceof NotificationsComponent).toBe(true);
  });

  it('should contain element with class "notifications"', () => {
    let elemNotif: HTMLElement = fixture.debugElement.query(By.css('.notifications')).nativeElement;

    expect(elemNotif).toBeDefined();
  });

  it('should have property "notificationsData" which should be an array', () => {
    expect(Array.isArray(comp.notificationsData)).toBeTruthy();
  });

  it('should create multiple "notifications-item" components quantity of which should be equal to the length of notificationsData property of the component', () => {
    let elemNotifItems: HTMLElement[] = fixture.debugElement.query(By.css('.notifications')).nativeElement.querySelectorAll('.notifications-item');

    expect(elemNotifItems.length).toEqual(comp.notificationsData.length);
  });

  describe('Properties of "NotificationsItemComponent": ', () => {
    it('element with class "notifications-item" should have a class with type string value interpolated in its class name', () => {
      let className = `.notifications-item_type_${comp.notificationsData[0].type}`;
      let elemNotifItem: HTMLElement = fixture.debugElement.query(By.css(className)).nativeElement;

      expect(elemNotifItem).toBeDefined();
    });

    it('element with class "notifications-item__link" should have attribute directive "routerLink" which is equal to link value of comp.link', () => {
      let routerLinkAttr = fixture.debugElement.query(By.css('.notifications-item__link')).injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;

      expect(routerLinkAttr.linkParams).toEqual(`/${comp.notificationsData[0].link}`);
    });

    it('element with class "notifications-item__quantity" should have textContent equal to value of component "quantity" property', () => {
      let notifQuantity = fixture.debugElement.query(By.css('.notifications-item__quantity')).nativeElement.textContent;

      expect(notifQuantity).toEqual(comp.notificationsData[0].quantity.toString());
    });
  });
});
