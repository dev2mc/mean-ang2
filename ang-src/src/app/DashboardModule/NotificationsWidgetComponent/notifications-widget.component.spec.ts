import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {NotificationsWidgetComponent} from './notifications-widget.component';

describe('NotificationsWidgetComponent: ', () => {
  let twitter: number;
  let email: number;
  let money: number;

  let fixture: ComponentFixture<NotificationsWidgetComponent>;
  let comp: NotificationsWidgetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsWidgetComponent]
    });

    fixture = TestBed.createComponent(NotificationsWidgetComponent);
    comp = fixture.componentInstance;

    comp.twitter = 10;
    comp.email = 20;
    comp.money = 200;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof NotificationsWidgetComponent).toBe(true, 'should create NotificationsWidgetComponent');
  });

  it('element with class "notifications-widget__message_bg_twitter" should contain comp.twitter variable', () => {
    let textContent = fixture.debugElement.query(By.css('.notifications-widget__message_bg_twitter')).nativeElement.textContent;

    expect(textContent.indexOf(comp.twitter + '') > -1).toBeTruthy();
  });

  it('element with class "notifications-widget__message_bg_email" should contain comp.email variable', () => {
    let textContent = fixture.debugElement.query(By.css('.notifications-widget__message_bg_email')).nativeElement.textContent;

    expect(textContent.indexOf(comp.email + '') > -1).toBeTruthy();
  });

  it('element with class "notifications-widget__message_bg_money" should contain comp.money variable', () => {
    let textContent = fixture.debugElement.query(By.css('.notifications-widget__message_bg_money')).nativeElement.textContent;

    expect(textContent.indexOf(comp.money + '') > -1).toBeTruthy();
  });
});
