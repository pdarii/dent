import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuwidget',
  templateUrl: './menuwidget.component.html',
  styleUrls: ['./menuwidget.component.css']
})
export class MenuwidgetComponent implements OnInit {

  constructor(  private router: Router  ) { }

  ngOnInit() {
  }

  public goBirthdays() {
    this.router.navigate(['/birthdays']);
  }

  public goLongAgo() {
    this.router.navigate(['/werelongago']);
  }

}
