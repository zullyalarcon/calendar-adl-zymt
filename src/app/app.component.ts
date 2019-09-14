import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'calendar-adl-zymt';
  outFormat = false;
  formatText = '';
  outDate = '';
  formatOutputDate = 'YYYY-MM-DD';
  formatInputDate = 'YYYY/MM/DD';

  comboFormats =
    [ 'YYYY/MM/DD',
      'YYYY/DD/MM',
      'DD/MM/YYYY',
      'MM/DD/YYYY',
      'YYYY-MM-DD'
    ];

  formG = new FormGroup({
    formatSel: new FormControl(),
  });

  selectFormatI(item) {
    this.formatInputDate = item;
  }
}
