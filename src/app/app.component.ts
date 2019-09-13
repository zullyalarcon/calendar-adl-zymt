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

  comboFormats =
      [ 'YYYY/MM/DD',
        'YYYY/DD/MM',
        'DD/MM/YYYY',
        'MM/DD/YYYY',
        'YYYY-MM-DD' ];

  formG = new FormGroup({
    formatSel: new FormControl(),
    }
  );

  showDate() {
    this.outFormat = true;
    this.formatText = this.formG.value.formatSel.value;
  }
}
