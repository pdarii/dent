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
  private showSpinner = false;

  constructor(
    private clientsService: ClientsService,
    private router: Router) {}

  ngOnInit() {
    this.getClients();
   }

  public getClients(): void {
    this.showSpinner = true;
    this.clientsService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.showSpinner = false;
    });
  }

  public searchClient(name: string): void {
    if (name.trim() === '') {
      this.getClients();
      return;
    }
    this.showSpinner = true;
    this.clientsService.searchClient(name).subscribe((clients) => {
      console.log(clients);
      this.clients = clients;
      this.showSpinner = false;
    });

  }

  public editClient(client: Client): void {
    this.router.navigate(['/edit', client._id]);
  }

  public planClient(client: Client): void {
    this.router.navigate(['/plan', client._id]);
  }


}
