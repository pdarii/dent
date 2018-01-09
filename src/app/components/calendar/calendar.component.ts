import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClientsService } from './../../services/clients.service';
import { CALENDARCONFIG } from './calendar.config';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class ClinicCalendarComponent implements OnInit {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  private self = this;
  private showSpinner = true;
  private dataisLoaded = false;
  public config: any;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.showSpinner = true;
    this.clientsService.getCalendarData().subscribe((calendarData) => {
      this.createCalendarEvents(calendarData);
      this.showSpinner = false;
    });
  }

  public onCalendarInit(event) { }

  public changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }

  private createCalendarEvents(calendarData) {
    const eventsRes = [];
    calendarData.map((event) => {
      // var client = ClientsList.findOne({ _id: event.clientid });
      eventsRes.push({
        'client': '{{ Client Name}}',
        'start': event.datetime,
        'clientid': event.clientid,
        'eventid': event._id,
        'color': '#edd58e',
        // doc color or past color
      });
    });
    console.log(eventsRes);
    const config = CALENDARCONFIG;
    config.events = eventsRes;
    this.config = config;
  }

  public goToDay(day) {
    this.myCalendar.fullCalendar('gotoDate', day);
    this.myCalendar.fullCalendar('changeView', 'agendaDay');
  }

}
