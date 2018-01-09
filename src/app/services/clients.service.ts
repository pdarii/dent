import { Injectable } from '@angular/core';
import { Client } from './../interfaces/client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {

  constructor(private http: HttpClient) { }

  public addClient(client): Observable<any> {
    return this.http.post('http://localhost:3000/api/addClient', client).map((result) => {
      return result['data'];
    });
  }

  public saveClient(client): Observable<any> {
    return this.http.post('http://localhost:3000/api/saveClient', client).map((result) => {
      return result['data'];
    });
  }

  public deleteClient(id): Observable<any> {
    return this.http.post('http://localhost:3000/api/deleteClient', {id}).map((result) => {
      return result['data'];
    });
  }

  public getClients(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getClients').map((result) => {
      return result['data'];
    });
  }

  public getCalendarData(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getCalendarData').map((result) => {
      return result['data'];
    });
  }

  public getClientById(id: string): Observable<any> {
      return this.http.get(`http://localhost:3000/api/getClientById/${id}`).map((result) => {
        return result['data'];
      });
  }

  public getPacients(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getStatistic').map((result) => {

    const stat = [];
    const stat2 = [];


    result['data'].forEach((item) => {
      const index = item.datetime.substring(0, 7);
      if (stat[index]) {
        stat[index]++;
      } else {
        stat[index] = 1;
      }
    });
    console.log(JSON.stringify(stat));

    console.log(stat);
    // return stat2;

    });
  }

  public searchClient(name: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/searchClient/${name}`).map((result) => {
      return result['data'];
    });
  }

  public getJobs(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getJobs').map((result) => {
      return result['data'];
    });
  }

  public getClientsCount(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/getClientsCount`).map((result) => {
      return result['data'];
    });
  }


}
