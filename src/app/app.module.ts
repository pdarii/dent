import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { ModalModule } from 'ngx-bootstrap';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

import { CalendarModule } from 'ap-angular2-fullcalendar';


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
import { PlananonymousclientComponent } from './components/plananonymousclient/plananonymousclient.component';


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
    PlananonymousclientComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CalendarModule,
    NvD3Module,
  ],
  providers: [ ClientsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
