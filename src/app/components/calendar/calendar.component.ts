import { ClientsService } from './../../services/clients.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';
import { colors } from './mock';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class ClinicCalendarComponent implements OnInit {

  showSpinner = true;
  locale = 'uk';
  view = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  public calendarEvents: CalendarEvent[];
  events: CalendarEvent[] = [];
  eventss: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen = true;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getData();
   // console.log(this.events);
  }

  private getData() {
    this.showSpinner = true;
    this.clientsService.getCalendarData().subscribe((calendarData) => {
    this.events = calendarData.map((event) => {
      return {
        start: new Date(event.datetime),
        end: new Date(event.datetime),
        title: `${this.getClientName(event.client)} / ${event.jobdone}`,
        color: colors.red,

      };

    });
      console.log(calendarData);
      console.log(this.events);
      this.showSpinner = false;
      this.refresh.next();

    });
  }

  private getClientName(client) {
    return client.length ? `${client[0].name} ${client[0].surname}` : '';
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log({ event, action });
  }

}
