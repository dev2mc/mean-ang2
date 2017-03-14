import {Component, OnInit} from '@angular/core';

let template = require('./search.component.html');
let styles = require('./search.component.scss');

@Component({
  selector: 'search',
  template: template,
  styles: [styles]
})
export class SearchComponent implements OnInit {
  showMobInput: boolean;

  constructor(){};

  ngOnInit(): void {
    this.showMobInput = false;
  }
}
