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
  yearList: any[];

  constructor() { }

  ngOnInit() {
    this.month = this.month ? this.month : '01';
    this.day = this.day ? this.day : '01';
    this.year = this.year ? this.year : '2000';
    this.yearList = [];

    const paramDate = new Date(`${this.year}` + '/' + `${this.month}` + '/' + `${this.day}`); 
    // moment(`${this.year}` + '/' + `${this.month}` + '/' + `${this.day}`);
    const today = new Date();
    if (this.year) {
      const yearT = today.getFullYear() - paramDate.getFullYear();
      for (let i = 0; i < yearT; i++) {
        const yearCu = today.getFullYear() - i;
        this.yearList.push(yearCu);
      }
    }
    // console.log(now);
  }

}
