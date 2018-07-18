import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ClientsService {
  constructor(private http: HttpClient) {}

  // DEV
  private link = 'http://localhost:3000';

  // PROD
  // private link = '';


  public addClient(client): Observable<any> {
    return this.http
      .post(this.link + '/api/addClient', client)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public planClient(client): Observable<any> { console.log(client);
    return this.http
      .post(this.link + '/api/planClient', client)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public editPlanClient(event): Observable<any> { console.log(event);
    return this.http
      .post(this.link + '/api/editPlanClient', event)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public saveClient(client): Observable<any> {
    return this.http
      .post(this.link + '/api/saveClient', client)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public deleteClient(id): Observable<any> {
    return this.http
      .post(this.link + '/api/deleteClient', { id })
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public deleteEvent(id): Observable<any> {
    return this.http
      .post(this.link + '/api/deleteEvent', { id })
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getClients(): Observable<any> {
    return this.http.get(this.link + '/api/getClients')
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getDoctors(): Observable<any> {
    return this.http.get(this.link + '/api/getDoctors')
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getBirthdaysCount(): Observable<any> {
    return this.http
      .get(this.link + '/api/getBirthdaysCount')
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getCalendarData(): Observable<any> {
    return this.http
      .get(this.link + '/api/getCalendarData')
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getClientById(id: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getClientById/${id}`)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getPacients(period): Observable<any> {
    return this.http
      .post(this.link + '/api/getStatistic', period)
      .pipe(map((result: any) => {
        const stat = [];

        result['data'].forEach(item => {
          const index = item.datetime.substring(0, 7);
          if (stat[index]) {
            stat[index]++;
          } else {
            stat[index] = 1;
          }
        });
        return stat;
      }));
  }

  public searchClient(name: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/searchClient/${name}`)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getJobs(): Observable<any> {
    return this.http.get(this.link + '/api/getJobs')
      .pipe(map((result: any) => {
      return result['data'];
    }));
  }

  public getClientsCount(): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getClientsCount`)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getTimelineEvents(id: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getTimelineEvents/${id}`)
      .pipe(map((result: any) => {
        return result['data'];
      }));
  }

  public getTimelineEventById(id: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getTimelineEventById/${id}`)
      .pipe(map((result: any) => {
        return result['data'];
      }));

  }
}
