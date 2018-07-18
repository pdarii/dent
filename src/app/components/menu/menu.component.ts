import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../services/clients.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public clientsCount: number;
  constructor(private clientsService: ClientsService, private auth: AuthService) {}

  ngOnInit() {
    this.getClientsCount();
  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }

  public getClientsCount(): void {
    this.clientsService.getClientsCount().subscribe(num => {
      this.clientsCount = num;
    });
  }
}
