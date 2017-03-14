import {Component} from '@angular/core';

let template = require('./dashboard.component.html');
let styles = require('./dashboard.component.scss');

@Component({
  selector: 'dashboard',
  template: template,
  styles: [styles]
})
export class DashboardComponent {
  constructor(){};

  twitterMentions: number = 400;
  sales: number = 13140;
  visitors: number = 9001;
  messages: number = 350;

  yearlySales: number = 530.030;
  yearlyVisitors: number = 4204284;
  yearlyCustomers: number = 42000;

  weatherType: string = 'sunny';
  weatherTemperature: number = 25;
  weatherLocation: string = 'texas';

  hostingCount: number = 113;
  hostingMax: number = 200;
  emailCount: number = 535;
  emailMax: number = 986;

  notificationsTwitter: number = 5;
  notificationsEmail: number = 10;
  notificationsMoney: number = 400;

  dataGraphEarnings: number = 433.22;


  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55], label: 'Sales'},
    {data: [28, 48, 40, 19, 86, 27], label: 'Users'},
  ];
  public lineChartLegend:boolean = true;
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(115,203,167,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(115,215,209,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public lineChartType:string = 'line';
}
