import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CalendarComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(CalendarComponent, { injector });
    customElements.define('calendar-zymt', el);
  }
  ngDoBootstrap() {}
}
