import { Component, OnInit } from '@angular/core';

import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {

  client: Client;

  constructor(private clientsService: ClientsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap( ( params: ParamMap ) => this.clientsService.getClientById(params.get('id')))
    .subscribe((client) => {
      console.log(client);
      this.client = client;
    });
  }

  public planClient(client: Client): void {
    this.router.navigate(['/plan', client._id]);
  }

}
