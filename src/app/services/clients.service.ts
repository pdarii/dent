import { Injectable } from '@angular/core';
import { Client } from './../interfaces/client';
import { MOCKCLIENTS } from './mock-clients';


@Injectable()
export class ClientsService {

  constructor() { }

  public getClients(): Array<Client> {
    return MOCKCLIENTS;
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
