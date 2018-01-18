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

  constructor(  private router: Router, private clientsService: ClientsService  ) {
  this.clientsService.getBirthdaysCount().subscribe((birthdaysCount) => {
      this.birthdaysCount = birthdaysCount;
    });
  }

  ngOnInit() {
  }

  public goBirthdays() {
    this.router.navigate(['/birthdays']);
  }

  public goLongAgo() {
    this.router.navigate(['/werelongago']);
  }

}
