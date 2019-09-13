import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Input() year;
  @Input() month;
  @Input() day;
  @Input() format;

  yearList: any[];
  monthList: any[];
  dayList: any[];
  labelYear: string;
  formatDate: any;
  separator: string;
  inputDate: any;

  constructor() { }

  ngOnInit() {
    this.month = this.month ? this.month : '01';
    this.day = this.day ? this.day : '01';
    this.year = this.year ? this.year : '2000';
    this.yearList = [];
    this.formatDate = [];
    this.labelYear = 'Seleccione el año';
    const today = new Date();
    this.orderFormatDate();

    const paramDate = new Date(`${this.year}` + `${this.separator}` + `${this.month}` + `${this.separator}` + `${this.day}`);
    this.getYears(today, paramDate);

    this.inputDate = paramDate;
  }

  orderFormatDate() {
    switch (this.format) {
      case 'YYYY/MM/DD':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '3'}
        ];
        this.separator = '/';
        break;
      case 'YYYY/DD/MM':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '2'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '3'}
        ]
        this.separator = '/';
        break;
      case 'DD/MM/YYYY':
        this.formatDate = [
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '1'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '3'}
        ];
        this.separator = '/';
        break;
      case 'MM/DD/YYYY':
        this.formatDate = [
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '1'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '2'},
          {name: 'separator', placeholder: '/', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '3'}
        ];
        this.separator = '/';
        break;
      case 'YYYY-MM-DD':
        this.formatDate = [
          {name: 'year', placeholder: 'AÑO', required: 'required', readonly: '', tabIndex: '1'},
          {name: 'separator', placeholder: '-', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'month', placeholder: 'MES', required: 'required', readonly: '', tabIndex: '2'},
          {name: 'separator', placeholder: '-', required: '', readonly: 'readonly', tabIndex: '-1'},
          {name: 'day', placeholder: 'DIA', required: 'required', readonly: '', tabIndex: '3'}
        ];
        this.separator = '-';
        break;
    }
  }

  getYears(t: Date, p: Date) {
    let yearT = t.getFullYear() - p.getFullYear();

    if (yearT <= 0 ) {
      yearT = 20;
    }

    for (let i = 0; i < yearT; i++) {
      const yearCu = t.getFullYear() - i;
      this.yearList.push(yearCu);
    }
  }

  searchDate(event) {
    let arrayEvent;
    let arrayEventSuggestions;

    if (event.target.id === 'year') {
      arrayEvent = this.yearList;
    }

    arrayEventSuggestions = arrayEvent.filter(function(el) {
      let regex = '';

      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      regex = regex + inputChar;

      console.log(regex);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      } else {
        const re = new RegExp(`${regex}`, 'i');
        if ( re.test(el) ) {
          return el;
        }
      }
    });

    if (event.target.id === 'year') {
      this.yearList = arrayEventSuggestions;
    }

    console.log(this.yearList);
  }

}
