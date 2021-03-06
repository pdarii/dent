import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './components/clients/clients.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { ClinicCalendarComponent } from './components/calendar/calendar.component';
import { EditclientComponent } from './components/editclient/editclient.component';

import { LongagoComponent } from './components/longago/longago.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import { StatisticComponent } from './components/statistic/statistic.component';

import { PlanclientComponent } from './components/planclient/planclient.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditplanclientComponent } from './components/editplanclient/editplanclient.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'addclient', component: AddclientComponent },
  { path: 'calendar', component: ClinicCalendarComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'edit/:id', component: EditclientComponent },
  { path: 'editplan/:id', component: EditplanclientComponent },
  { path: 'plan/:id', component: PlanclientComponent },
  { path: 'birthdays', component: BirthdaysComponent },
  { path: 'werelongago', component: LongagoComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
