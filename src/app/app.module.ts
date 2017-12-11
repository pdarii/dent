import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { ClientsService } from './services/clients.service';
import { D3graphComponent } from './components/d3graph/d3graph.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module



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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



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
    D3graphComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule // <-- #2 add to @NgModule imports
  ],
  providers: [ ClientsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
