import { Component, OnInit } from '@angular/core';
import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private clients: Array<Client>;
  private showSpinner = true;

  constructor(
    private clientsService: ClientsService,
    private router: Router) {
    this.getClients();
  }

  ngOnInit() { }

  public getClients(): void {
   this.clientsService.getClients().subscribe((clients) => {
      console.log(clients);
      this.clients = clients;
      this.showSpinner = false;
    });
  }

  public searchClient(name: string): void {
    this.clients = this.clientsService.searchClient(name);
  }

  public editClient(client: Client): void {
    this.router.navigate(['/edit', client.id]);
  }

  public planClient(client: Client): void {
    this.router.navigate(['/plan', client.id]);
  }


}
