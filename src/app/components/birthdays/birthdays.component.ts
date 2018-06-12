import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css'],
})
export class BirthdaysComponent implements OnInit {
  public clients: any;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.getBirthdays();
  }

  private getBirthdays() {
    this.clientsService.getBirthdaysCount().subscribe(birthdaysCount => {
      this.formatCount(birthdaysCount);
    });
  }

  private formatCount(birthdaysCount) {
    const clients = [];
    const d = new Date();
    const month = d.getMonth();
    const day = d.getDate();

    birthdaysCount.map(client => {
      if (
        new Date(client.clientbirthday).getMonth() === month &&
        new Date(client.clientbirthday).getDate() === day
      ) {
        clients.push(client);
      }
    });

    this.clients = clients;
  }
}
