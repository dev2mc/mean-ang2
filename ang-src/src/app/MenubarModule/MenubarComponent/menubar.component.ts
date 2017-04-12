import {Component, OnInit, ChangeDetectorRef, ApplicationRef, NgZone} from '@angular/core';

import {WindowRefService} from '../../shared/WindowRefService/window-ref.service';

let template = require('./menubar.component.html');
let styles = require('./menubar.component.scss');

interface menuItem {
  icon: string,
  name: string,
  link: string
}

@Component({
  selector: 'menubar',
  template: template,
  styles: [styles],
})
export class MenubarComponent implements OnInit {
  menuDataArr: menuItem[] = [
    {
      icon: 'fa-tachometer',
      name: 'dashboard',
      link: 'dashboard'
    },
    {
      icon: 'fa-envelope',
      name: 'mail',
      link: 'mail'
    },
    {
      icon: 'fa-tasks',
      name: 'tasks',
      link: 'tasks'
    },
    {
      icon: 'fa-bar-chart',
      name: 'charts',
      link: 'charts'
    },
    {
      icon: 'fa-comment',
      name: 'comment',
      link: 'comments'
    },
    {
      icon: 'fa-cog',
      name: 'settings',
      link: 'settings'
    },
    {
      icon: 'fa-star',
      name: 'feedback',
      link: 'feedback'
    },
    {
      icon: 'fa-link',
      name: 'links',
      link: 'links'
    },
    {
      icon: 'fa-share-alt',
      name: 'social',
      link: 'social'
    },
    {
      icon: 'fa-trophy',
      name: 'achievement',
      link: 'achievement'
    },
    {
      icon: 'fa-power-off',
      name: 'logout',
      link: 'logout'
    }
  ];
  collapsed: boolean = false;

  constructor(private winRef: WindowRefService, private zone: NgZone){};

  resizeMenubar(): void {
    if (this.winRef.nativeWindow.innerWidth < 991) {
      this.collapsed = true;
      this.zone.run(()=>{console.log('NgZone.run() has been invoked')});
    } else {
      this.collapsed = false;
      this.zone.run(()=>{console.log('NgZone.run() has been invoked')});
    }
  }

  ngOnInit(): void {
    this.winRef.nativeWindow.addEventListener('resize', this.resizeMenubar.bind(this));
    this.resizeMenubar();
  }
}
