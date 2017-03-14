import {Component, OnInit, ChangeDetectorRef, ApplicationRef, NgZone} from '@angular/core';

import {WindowRefService} from '../../shared/WindowRefService/window-ref.service';

let template = require('./menubar.component.html');
let styles = require('./menubar.component.scss');

interface menuItem {
  icon: string,
  name: string,
  link: string,
  number: string|boolean
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
      link: 'dashboard',
      number: false
    },
    {
      icon: 'fa-envelope',
      name: 'mail',
      link: 'mail',
      number: false
    },
    {
      icon: 'fa-tasks',
      name: 'tasks',
      link: 'tasks',
      number: false
    },
    {
      icon: 'fa-bar-chart',
      name: 'charts',
      link: 'charts',
      number: false
    },
    {
      icon: 'fa-comment',
      name: 'comment',
      link: 'comments',
      number: '9'
    },
    {
      icon: 'fa-cog',
      name: 'settings',
      link: 'settings',
      number: false
    },
    {
      icon: 'fa-star',
      name: 'feedback',
      link: 'feedback',
      number: false
    },
    {
      icon: 'fa-link',
      name: 'links',
      link: 'links',
      number: false
    },
    {
      icon: 'fa-share-alt',
      name: 'social',
      link: 'social',
      number: false
    },
    {
      icon: 'fa-trophy',
      name: 'achievement',
      link: 'achievement',
      number: false
    },
    {
      icon: 'fa-power-off',
      name: 'logout',
      link: 'logout',
      number: false
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
