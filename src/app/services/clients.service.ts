import { Injectable } from '@angular/core';
import { Client } from './../interfaces/client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {
  constructor(private http: HttpClient) {}

  // DEV
  // private link = 'http://localhost:3000';

  // PROD
  private link = '';


  public addClient(client): Observable<any> {
    return this.http
      .post(this.link + '/api/addClient', client)
      .map(result => {
        return result['data'];
      });
  }

  public planClient(client): Observable<any> {
    return this.http
      .post(this.link + '/api/planClient', client)
      .map(result => {
        return result['data'];
      });
  }

  public saveClient(client): Observable<any> {
    return this.http
      .post(this.link + '/api/saveClient', client)
      .map(result => {
        return result['data'];
      });
  }

  public deleteClient(id): Observable<any> {
    return this.http
      .post(this.link + '/api/deleteClient', { id })
      .map(result => {
        return result['data'];
      });
  }

  public getClients(): Observable<any> {
    return this.http.get(this.link + '/api/getClients').map(result => {
      return result['data'];
    });
  }

  public getDoctors(): Observable<any> {
    return this.http.get(this.link + '/api/getDoctors').map(result => {
      return result['data'];
    });
  }

  public getBirthdaysCount(): Observable<any> {
    return this.http
      .get(this.link + '/api/getBirthdaysCount')
      .map(result => {
        return result['data'];
      });
  }

  public getCalendarData(): Observable<any> {
    return this.http
      .get(this.link + '/api/getCalendarData')
      .map(result => {
        return result['data'];
      });
  }

  public getClientById(id: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getClientById/${id}`)
      .map(result => {
        return result['data'];
      });
  }

  public getPacients(period): Observable<any> {
    return this.http
      .post(this.link + '/api/getStatistic', period)
      .map(result => {
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
      });
  }

  public searchClient(name: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/searchClient/${name}`)
      .map(result => {
        return result['data'];
      });
  }

  public getJobs(): Observable<any> {
    return this.http.get(this.link + '/api/getJobs').map(result => {
      return result['data'];
    });
  }

  public getClientsCount(): Observable<any> {

    console.log('getClientsCount');
    console.log(`${ this.link }/api/getClientsCount`);


    return this.http
      .get(`${ this.link }/api/getClientsCount`)
      .map(result => {
        return result['data'];
      });
  }

  public getTimelineEvents(id: string): Observable<any> {
    return this.http
      .get(`${ this.link }/api/getTimelineEvents/${id}`)
      .map(result => {
        return result['data'];
      });
  }
}
