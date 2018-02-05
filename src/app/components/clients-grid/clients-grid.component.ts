import { Component, OnInit, Input } from '@angular/core';
import { Client } from './../../interfaces/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients-grid.component.html',
  styleUrls: ['./clients-grid.component.css']
})
export class ClientsGridComponent implements OnInit {
@Input() clients = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public editClient(client: Client): void {
    this.router.navigate(['/edit', client._id]);
  }

  public planClient(client: Client): void {
    this.router.navigate(['/plan', client._id]);
  }

}
