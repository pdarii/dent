import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClientsService } from './../../services/clients.service';
// import { CALENDARCONFIG } from './calendar.config';

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
  public calendarOptions: any = {
    // lang: 'uk',
    locale: 'uk',
    defaultTimedEventDuration: '00:30:00',
    firstDay: '1',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month agendaWeek agendaDay'
    },
    allDaySlot: false,
    timeFormat: 'H(:mm)', // uppercase H for 24-hour clock
    weekNumbers: false,
    editable: true,
    height: '200px',
    fixedWeekCount: false,
    eventLimit: true, // allow "more" link when too many events
    views: {
      agendaDay: {
        minTime: '07:00:00',
        maxTime: '22:00:00',
        axisFormat: 'H(:mm)'
      }
    },
    events: [],
    dayClick: function (date, jsEvent, view) {
      console.log(this);
      console.log(this.parent);
      // view.gotoDate(date);
      // this('changeView', 'agendaDay');

    },
    eventClick: function (calEvent, jsEvent, view) {
      jQuery('.fc').fullCalendar('gotoDate', calEvent.start);
      jQuery('.fc').fullCalendar('changeView', 'agendaDay');
    }
  };

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.showSpinner = true;
    this.clientsService.getCalendarData().subscribe((calendarData) => {
      this.calendarOptions.events = this.createCalendarEvents(calendarData);
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
    return eventsRes;

  }

  public goToDay(day) {
    this.myCalendar.fullCalendar('gotoDate', day);
    this.myCalendar.fullCalendar('changeView', 'agendaDay');
  }


}
