import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  // encapsulation: ViewEncapsulation.Native
})

export class CalendarComponent implements OnInit, AfterViewInit {

  @Input() formatInput;

  year: any;
  month: any;
  day: any;
  pickList: any[];
  yearList: any[];
  monthList: any[];
  dayList: any[];
  dayListEmpty: any[];
  labelYear: string;
  formatDate: any;
  separator: string;
  inputDate: any;
  selectDay: any;
  selectYear: any;
  selectMonth: any;
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
    this.dayListEmpty = [];
    this.labelYear = 'Seleccione el año';
    this.today = new Date();
    this.orderFormatDate();
    this.pickYear = false;
    this.pickMonth = false;
    this.pickDay = false;
    this.dayNameList = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.invalid = '';

    this.getYears();
    this.getMonths();

  }

  ngAfterViewInit() {
    (document.getElementById('month') as HTMLInputElement).disabled = true;
    (document.getElementById('day') as HTMLInputElement).disabled = true;
  }

  orderFormatDate() {
    console.log(this.formatInput);
    switch (this.formatInput) {
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
    } else if (this.year !== '') {
      // this.invalid = 'error-input';
      (document.getElementById('month') as HTMLInputElement).value = '';
      (document.getElementById('day') as HTMLInputElement).value = '';
      for (let i = 0; i < 25; i++) {
        const yearCu = this.today.getFullYear() - i;
        this.yearList.push(yearCu);
      }
    }
  }

  daysMaxInMonth(month, year) {
    return 31 - new Date(year, (month - 1), 32).getDate();
  }

  getMonths() {
    for (let m = 1; m <= 12; m++) {
      this.monthList.push({id: m, name: this.monthNames[m - 1]});
    }
  }

  getMonthWithDays() {
    this.dayList = [];
    this.dayListEmpty = [];
    const maxDay = this.daysMaxInMonth(this.month, this.year);
    const firstDay = (new Date(this.year, (this.month - 1))).getDay();
    for (let d = 1; d <= maxDay + 1; d++) {
      this.dayList.push(d < 10 ? '0' + d : d.toString());
    }
    for (let i = 1; i <= firstDay; i++) {
      this.dayListEmpty.push(i);
    }
  }

  searchDate(event) {
    let arrayEvent;
    let arrayEventSuggestions;

    if (event.target.id === 'year') {
      arrayEvent = this.yearList;

      arrayEventSuggestions = arrayEvent.filter(function(el) {
        const re = new RegExp(`^${event.target.value}`, 'i');
        if ( re.test(el) ) {
          return el;
        }
      });

      this.year = event.target.value;
      this.selectYear = arrayEventSuggestions[0];
      (document.getElementById('month') as HTMLInputElement).disabled = false;
    }

    if (event.target.id === 'month') {
      arrayEvent = this.monthList;

      arrayEventSuggestions = arrayEvent.filter(function(el) {
        const regex = event.target.value;
        const replaceMonth = (regex < 10) ? regex.replace(/0/g, '') : regex;
        const re = new RegExp(`^${replaceMonth}`, 'i');
        if ( re.test(el.id) ) {
          return el;
        }
      });

      this.month = event.target.value;
      this.selectMonth = arrayEventSuggestions[0].id;
      (document.getElementById('day') as HTMLInputElement).disabled = false;

    }

    if (event.target.id === 'year' && arrayEventSuggestions.length === 0 ) {
      this.year = event.target.value;
      this.getYears();
    }

    if (event.target.id === 'day') {
      arrayEvent = this.dayList;

      arrayEventSuggestions = arrayEvent.filter(function(el) {
        const regex = event.target.value;
        const replaceDay = (regex < 10) ? '0' + regex : regex;
        const re = new RegExp(`^${replaceDay}`, 'i');
        if ( re.test(el) ) {
          return el;
        }
      });

      this.day = event.target.value;
      this.selectDay = arrayEventSuggestions[0];
    }
  }

  selectItem(event, value) {
    if (value === 'y') {
      (document.getElementById('year') as HTMLInputElement).value = event;
      this.selectYear = event;
      this.year = event;
    }
    if (value === 'm') {
      (document.getElementById('month') as HTMLInputElement).value = event;
      this.selectMonth = event;
      this.month = event;
    }
    if (value === 'd') {
      (document.getElementById('day') as HTMLInputElement).value = event;
      this.day = event;
      this.selectDay = event;
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
