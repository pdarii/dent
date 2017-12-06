import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public clientsCount: number;
  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getClientsCount();
  }

  public getClientsCount(): void {
    this.clientsService.getClientsCount().subscribe((num) => {
      this.clientsCount = num;
    });
  }

}
