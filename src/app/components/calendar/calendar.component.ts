import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class ClinicCalendarComponent implements OnInit {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  private showSpinner = true;
  private dataisLoaded = false;
  public calendarData: any;

  public calendarOptions: Object = {
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
    defaultDate: '2016-09-12',
    eventLimit: true, // allow "more" link when too many events
    views: {
      agendaDay: {
        minTime: '07:00:00',
        maxTime: '22:00:00',
        axisFormat: 'H(:mm)'

      }
    },
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };


  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getData();
  }

  // {_id: "5a35a1449160ad597abca8bf", clientid: "6JQpcZXo72fvMBRhC", datetime: "2017-02-24T13:25:00.000Z",
  // jobdone: "Зняття з к. та з.н.", doctor: "Ncm3h9kamZLsi2Yjp"}
  private getData() {
    this.showSpinner = true;
    this.clientsService.getCalendarData().subscribe((calendarData) => {

      console.log(calendarData);

      this.calendarData = calendarData;
      this.showSpinner = false;
    });
  }

  public onCalendarInit(event) {
  }

  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }


}
