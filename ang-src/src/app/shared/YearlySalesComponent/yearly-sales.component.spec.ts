import {TestBed, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {YearlySalesComponent} from './yearly-sales.component';

describe('description', () => {
  let sales: number;
  let visitors: number;
  let customers: number;
  let fixture: ComponentFixture<YearlySalesComponent>;
  let comp: YearlySalesComponent;

  beforeEach(() => {
    sales = 34;
    visitors = 12;
    customers = 23;

    TestBed.configureTestingModule({
      declarations: [YearlySalesComponent]
    });

    fixture = TestBed.createComponent(YearlySalesComponent);
    comp = fixture.componentInstance;

    comp.sales = sales;
    comp.visitors = visitors;
    comp.customers = customers;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp instanceof YearlySalesComponent).toBe(true, 'should create YearlySalesComponent');
  });

  it('"yearly-sales__sum_col_sales" element should contain comp.sales test', () => {
    let sales = fixture.debugElement.query(By.css('.yearly-sales__sum_col_sales')).nativeElement.textContent;

    expect(sales.indexOf(comp.sales) > -1).toBeTruthy();
  });

  it('"yearly-sales__sum_col_visitors" element should contain comp.visitors test', () => {
    let visitors = fixture.debugElement.query(By.css('.yearly-sales__sum_col_visitors')).nativeElement.textContent;

    expect(visitors.indexOf(comp.visitors) > -1).toBeTruthy();
  });

  it('"yearly-sales__sum_col_customers" element should contain comp.customers test', () => {
    let customers = fixture.debugElement.query(By.css('.yearly-sales__sum_col_customers')).nativeElement.textContent;

    expect(customers.indexOf(comp.customers) > -1).toBeTruthy();
  });
});
