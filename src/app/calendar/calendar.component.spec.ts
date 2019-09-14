import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import * as moment from 'moment';
import { EventEmitter } from 'protractor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
    component.year.value = '2019';
    component.month.value = '12';
    component.day.value = '12';
    component.ngOnInit();

    expect(component).toBeTruthy();

  });

  it('should call orderFormatDate', () => {
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

    component.formatInput = 'YYYY/DD/MM';
    component.formatOutput = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

    component.formatInput = 'DD/MM/YYYY';
    component.formatOutput = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

    component.formatInput = 'MM/DD/YYYY';
    component.formatOutput = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

    component.formatInput = 'YYYY-MM-DD';
    component.formatOutput = 'YYYY/MM/DD';
    expect(component.orderFormatDate()).toBeUndefined();

  });

  it('should call ngOnInit', () => {
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('should call getMonthWithDays', () => {
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
    component.month = '2';
    component.year = '2000';
    component.day = '12';
    expect(component.getMonthWithDays()).toBeUndefined();
  });

  it('should call focusDisplay', () => {
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
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
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
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
    component.formatInput = 'YYYY/MM/DD';
    component.formatOutput = 'YYYY/MM/DD';
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
