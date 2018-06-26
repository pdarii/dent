import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

// Ukrainian locale for calendar
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
registerLocaleData(localeUk);

import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Bootstrap
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Chart
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

// Calendar
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { ClientsService } from './services/clients.service';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { ClinicCalendarComponent } from './components/calendar/calendar.component';
import { EditclientComponent } from './components/editclient/editclient.component';
import { LongagoComponent } from './components/longago/longago.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import { MenuwidgetComponent } from './components/menuwidget/menuwidget.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PlanclientComponent } from './components/planclient/planclient.component';
import { ClientsGridComponent } from './components/clients-grid/clients-grid.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditplanclientComponent } from './components/editplanclient/editplanclient.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientsComponent,
    AddclientComponent,
    ClinicCalendarComponent,
    EditclientComponent,
    LongagoComponent,
    BirthdaysComponent,
    MenuwidgetComponent,
    StatisticComponent,
    PlanclientComponent,
    ClientsGridComponent,
    SpinnerComponent,
    TimelineComponent,
    AdminComponent,
    EditplanclientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    CalendarModule.forRoot(),
    AngularFontAwesomeModule,
    NvD3Module,
  ],
  providers: [ClientsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
