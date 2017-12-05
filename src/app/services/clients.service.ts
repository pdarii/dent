import { Injectable } from '@angular/core';
import { Client } from './../interfaces/client';
import { MOCKCLIENTS } from './mock-clients';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {

  constructor(private http: HttpClient) { }

  public getClients(): Array<Client> {
    return MOCKCLIENTS;
  }

  public getPacients(): Observable<any> {
    console.log('getPacients');
    return this.http.get('http://localhost:3000/api/getStatistic').map((result) => {

    const stat = [];
    const stat2 = [];


    result['data'].forEach((item) => {
      const index = item.datetime.substring(0, 7);
      if (stat[index]) {
        stat[index]++;
      }else {
        stat[index] = 1;
      }
    });
    console.log(JSON.stringify(stat));



    console.log(stat);
    // return stat2;

    });
  }


  public getClientById(id: number): Promise<Client> {
    return Promise.resolve(MOCKCLIENTS.find( (client) => {
      return client.id === id;
    }));
  }

  public searchClient(name: string): Array<Client> {
    return MOCKCLIENTS.filter( (client) => {
      const cName = client.name.toLocaleLowerCase();
      if ( cName.indexOf(name.toLocaleLowerCase()) >= 0) {
        return client;
      }
    });
  }




}
