import { ClientsService } from './../../services/clients.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs/Subject';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';
import { colors } from './mock';
import * as moment from 'moment';
import {Router} from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class ClinicCalendarComponent implements OnInit {
  showSpinner = true;
  locale = 'uk';
  view = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  doctors: any;

  activeDayIsOpen = true;

  constructor(
    private clientsService: ClientsService,
    private router: Router
) {}

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.showSpinner = true;
      this.clientsService.getDoctors().subscribe(doctors => {
        this.doctors = doctors;
        this.clientsService.getCalendarData().subscribe(calendarData => {
          this.events = calendarData.map(event => {
            return {
              start: new Date(event.datetime),
              end: new Date(event.datetime),
              title: `${this.getClientName(event.client)} / ${
                event.jobdone
                } / ${moment(event.datetime).format('HH:mm DD/MM/YYYY')}`,
              color: this.getColor(event.doctor),
              clientId: event.clientid,
              id: event._id,
            };
          });
          this.showSpinner = false;
          this.refresh.next();
        });
      });
  }

  private getColor(doctor) {
    const doc = _.find(this.doctors, {'_id': doctor});
    return doc ? {
          primary: `${doc.color}`,
          secondary: `#FAE3E3`,
        } : {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      };
  }

  private getClientName(client) {
    return client.length ? `${client[0].name || ''} ${client[0].father  || ''} ${client[0].surname  || ''}` : 'Анонім';
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
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    this.router.navigate([`/editplan/${event.id}`]);
  }
}
