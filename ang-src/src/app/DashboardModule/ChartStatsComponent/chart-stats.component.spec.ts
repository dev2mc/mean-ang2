import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ChartsModule} from 'ng2-charts/ng2-charts';

import {ChartStatsComponent} from './chart-stats.component';

describe('ChartStatsComponent: ', () => {
  let data:Array<any>;
  let labels:Array<any>;
  let colors:Array<any>;
  let legend:boolean;
  let type:string;

  let fixture: ComponentFixture<ChartStatsComponent>;
  let comp: ChartStatsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule],
      declarations: [ChartStatsComponent]
    });

    fixture = TestBed.createComponent(ChartStatsComponent);
    comp = fixture.componentInstance;

    comp.data = [
      {data: [65, 59, 80, 81, 56, 55], label: 'Sales'},
      {data: [28, 48, 40, 19, 86, 27], label: 'Users'},
    ];
    comp.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    comp.colors = [
      {
        backgroundColor: 'rgba(115,203,167,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {
        backgroundColor: 'rgba(115,215,209,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      }
    ];
    comp.legend = true;
    comp.type = 'line';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof ChartStatsComponent).toBe(true, 'should create ChartStatsComponent');
  });

  it('"canvas" element should be present', () => {
    let canvas = fixture.debugElement.query(By.css('.chart-stats')).nativeElement.querySelectorAll('canvas');

    expect(canvas).not.toEqual(null);
  });
});
