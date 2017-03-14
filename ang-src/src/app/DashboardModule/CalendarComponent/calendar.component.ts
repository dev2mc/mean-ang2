import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

let template = require('./calendar.component.html');
let styles = require('./calendar.component.scss');

@Component({
  selector: 'calendar',
  template: template,
  styles: [styles]
})
export class CalendarComponent {
  weeks: any = [];
  selected: any;
  month: any;
  start: any;

  constructor(){};

  ngOnInit() {
    this.selected = this._removeTime(this.selected || moment());
    this.month = this.selected.clone();

    this.start = this.selected.clone();
    this.start.date(1);
    this._removeTime(this.start.day(0));

    this._buildMonth(this.start, this.month);
  }

  select(day: any) {
    this.selected = day.date;
  }

  next() {
    let next = this.month.clone();
    this._removeTime((next.month(next.month()+1)).date(1));
    this.month.month(this.month.month()+1);
    this._buildMonth(next, this.month);
  };

  previous() {
    let previous = this.month.clone();
    this._removeTime(previous.month(previous.month()-1).date(1));
    this.month.month(this.month.month()-1);
    this._buildMonth(previous, this.month);
  };

  _removeTime(date:any) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  _buildMonth(start: any, month: any) {
    this.weeks = [];
    let done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    while (!done) {
      this.weeks.push({ days: this._buildWeek(date.clone(), month) });
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  _buildWeek(date: any, month: any) {
    let days:any[] = [];
    for (let i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      });
      date = date.clone();
      date.add(1, "d");
    }
    return days;
  }
}
