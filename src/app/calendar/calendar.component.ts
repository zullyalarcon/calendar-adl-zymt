import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Input() format;

  year: any;
  month: any;
  day: any;
  pickList: any[];
  yearList: any[];
  monthList: any[];
  dayList: any[];
  labelYear: string;
  formatDate: any;
  separator: string;
  inputDate: any;
  selectYear: any;
  today: Date;
  pickYear: boolean;
  pickMonth: boolean;
  pickDay: boolean;
  dayNameList: any[];
  monthNames: any[];
  invalid: string;

  constructor() { }

  ngOnInit() {
    this.month = this.month ? this.month : '01';
    this.day = this.day ? this.day : '01';
    this.year = this.year ? this.year : '2019';
    this.yearList = [];
    this.monthList = [];
    this.dayList = [];
    this.formatDate = [];
    this.labelYear = 'Seleccione el año';
    this.today = new Date();
    this.orderFormatDate();
    this.pickYear = false;
    this.pickMonth = false;
    this.pickDay = false;
    this.dayNameList = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.invalid = '';

    this.getYears();
    this.getMonths();

  }

  orderFormatDate() {
    switch (this.format) {
      case 'YYYY/MM/DD':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '3', type: 'number'}
        ];
        this.separator = '/';
        break;
      case 'YYYY/DD/MM':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '2', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '3', type: 'number'}
        ];
        this.separator = '/';
        break;
      case 'DD/MM/YYYY':
        this.formatDate = [
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '1', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '3', type: 'number'}
        ];
        this.separator = '/';
        break;
      case 'MM/DD/YYYY':
        this.formatDate = [
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '1', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '2', type: 'number'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '3', type: 'number'}
        ];
        this.separator = '/';
        break;
      case 'YYYY-MM-DD':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1', type: 'number'},
          {name: 'separator', placeholder: '-', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2', type: 'number'},
          {name: 'separator', placeholder: '-', required: '', readonly: 'readonly', tabIndex: '-1', type: 'text'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '3', type: 'number'}
        ];
        this.separator = '-';
        break;
    }
  }

  getYears() {
    this.yearList = [];
    const paramDate = new Date(`${this.year}` + `${this.separator}` + `${this.month}` + `${this.separator}` + `${this.day}`);

    if (paramDate.getFullYear() >= 1920 && paramDate.getFullYear() <= 2019) {
      this.invalid = '';
      for (let i = 0; i < 25; i++) {
        const yearCu = paramDate.getFullYear() - i;
        this.yearList.push(yearCu);
      }
    } else {
      this.invalid = 'error-input';
      for (let i = 0; i < 25; i++) {
        const yearCu = this.today.getFullYear() - i;
        this.yearList.push(yearCu);
      }
    }
  }

  daysMaxInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
  }

  getMonths() {
    for (let m = 1; m <= 12; m++) {
      this.monthList.push(m + '-' + this.monthNames[m - 1]);
    }
  }

  getMonthWithDays() {
    this.dayList = [];
    const maxDay = this.daysMaxInMonth(this.month, this.year);
    const firstDay = (new Date(this.month, this.year)).getDay();
    for (let d = 1; d <= maxDay + 1; d++) {
      this.dayList.push(d < 10 ? '0' + d : d);
    }
    console.log(firstDay);
  }

  searchDate(event) {
    let arrayEvent;
    let arrayEventSuggestions;

    if (event.target.id === 'year') {
      arrayEvent = this.yearList;
    }

    arrayEventSuggestions = arrayEvent.filter(function(el) {
      const re = new RegExp(`^${event.target.value}`, 'i');
      if ( re.test(el) ) {
        return el;
      }
    });

    if (event.target.id === 'year' && arrayEventSuggestions.length === 0 ) {
      this.year = event.target.value;
      this.getYears();
    }
    if (event.target.id === 'year') {
      this.year = event.target.value;
      this.selectYear = arrayEventSuggestions[0];
    }
  }

  selectItem(event, value) {
    if (value === 'y') {
      (document.getElementById('year') as HTMLInputElement).value = event;
      this.selectYear = event;
      this.year = event;
    }
    if (value === 'm') {
      this.month = event;
    }
    if (value === 'd') {
      this.day = event;
    }
  }

  focusDisplay(eventF) {
    if (eventF.target.id === 'year') {
      this.pickList = this.yearList;
      this.pickYear = true;
      this.pickMonth = false;
      this.pickDay = false;
    } else {
      if (eventF.target.id === 'month') {
        this.pickList = this.monthList;
        this.pickYear = false;
        this.pickMonth = true;
        this.pickDay = false;
      } else {
        this.getMonthWithDays();
        this.pickList = this.dayList;
        this.pickYear = false;
        this.pickMonth = false;
        this.pickDay = true;
      }
    }
  }
}
