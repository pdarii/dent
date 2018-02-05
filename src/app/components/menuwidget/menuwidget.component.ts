import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-menuwidget',
  templateUrl: './menuwidget.component.html',
  styleUrls: ['./menuwidget.component.css']
})
export class MenuwidgetComponent implements OnInit {

  birthdaysCount: number;

  constructor(  private router: Router, private clientsService: ClientsService  ) {}

  ngOnInit() {
   this.getBirthdays();
  }

  private getBirthdays() {
    this.clientsService.getBirthdaysCount().subscribe((birthdaysCount) => {
      this.formatCount(birthdaysCount);
    });
  }

  private formatCount(birthdaysCount) {
    const birthdays = [];
    const d = new Date();
    const month = d.getMonth();
    const day = d.getDate();

    birthdaysCount.map(( client ) => {

      if ( (new Date(client.clientbirthday)).getMonth() === month &&
           (new Date(client.clientbirthday)).getDate() === day ) {
            birthdays.push(client);
      }
    });

    this.birthdaysCount = birthdays.length;
  }

  public goBirthdays() {
    this.router.navigate(['/birthdays']);
  }

  public goLongAgo() {
    this.router.navigate(['/werelongago']);
  }

}
