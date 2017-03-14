import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {TopbarComponent} from './topbar.component';
import {NotificationsComponent} from '../NotificationsComponent/notifications.component';
import {NotificationsItemComponent} from '../NotificationsItemComponent/notifications-item.component';
import {ProfileComponent} from '../ProfileComponent/profile.component';
import {SearchComponent} from '../SearchComponent/search.component';

import {RouterLinkStubDirective} from '../../../../testing/router-link-stub.directive';

describe('TopbarComponent', () => {
  let fixture: ComponentFixture<TopbarComponent>;
  let comp: TopbarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopbarComponent,
        NotificationsComponent,
        NotificationsItemComponent,
        ProfileComponent,
        SearchComponent,
        RouterLinkStubDirective
      ]
    })

    fixture = TestBed.createComponent(TopbarComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(comp instanceof TopbarComponent).toBe(true, 'should create TopbarComponent');
  });

  it('should contian element with class "notifications"', () => {
    let elemNotif: HTMLElement = fixture.debugElement.query(By.css('.notifications')).nativeElement;

    expect(elemNotif).toBeDefined();
  });

  it('should contain element with class "profile"', () => {
    let elemProfile: HTMLElement = fixture.debugElement.query(By.css('.profile')).nativeElement;

    expect(elemProfile).toBeDefined();
  })

  it('should contain element with class "search"', () => {
    let elemSearch: HTMLElement = fixture.debugElement.query(By.css('.search')).nativeElement;

    expect(elemSearch).toBeDefined();
  })
});
