import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import * as moment from 'moment';
import { EventEmitter } from 'protractor';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.format = 'YYYY/MM/DD';
    expect(component).toBeTruthy();

  });

  it('should call orderFormatDate', () => {
    component.format = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

    component.format = 'YYYY/DD/MM';
    expect(component.orderFormatDate()).toBeUndefined();

    component.format = 'DD/MM/YYYY';
    expect(component.orderFormatDate()).toBeUndefined();

    component.format = 'MM/DD/YYYY';
    expect(component.orderFormatDate()).toBeUndefined();

    component.format = 'YYYY-MM-DD';
    expect(component.orderFormatDate()).toBeUndefined();

  });

  it('should call ngOnInit', () => {
    component.format = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('should call getMonthWithDays', () => {
    component.format = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    expect(component.getMonthWithDays()).toBeUndefined();
  });

  it('should call focusDisplay', () => {
    component.format = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    let event = {target: {
      id: 'year',
      value: '2000'
    }};
    expect(component.focusDisplay(event)).toBeUndefined();
    event = {target: {
      id: 'month',
      value: '10'
    }};
    expect(component.focusDisplay(event)).toBeUndefined();
    event = {target: {
      id: 'day',
      value: '20'
    }};
    expect(component.focusDisplay(event)).toBeUndefined();

  });


  it('should call selectItem', () => {
    component.format = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    let value = 'y';
    let event = {target: {
      id: 'year',
      value: '2000'
    }};
    expect(component.selectItem(event, value)).toBeUndefined();
    value = 'm';
    event = {target: {
      id: 'month',
      value: '2'
    }};
    expect(component.selectItem(event, value)).toBeUndefined();
    value = 'd';
    event = {target: {
      id: 'day',
      value: '20'
    }};
    expect(component.selectItem(event, value)).toBeUndefined();

  });

  it('should call searchDate', () => {
    component.format = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    let value = 'y';
    let event = {target: {
      id: 'year',
      value: '2000'
    }};
    expect(component.searchDate(event)).toBeUndefined();
    value = 'm';
    event = {target: {
      id: 'month',
      value: '10'
    }};
    expect(component.searchDate(event)).toBeUndefined();
    value = 'd';
    event = {target: {
      id: 'day',
      value: '20'
    }};
    expect(component.searchDate(event)).toBeUndefined();

  });
});
