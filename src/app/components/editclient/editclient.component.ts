import { Component, OnInit } from '@angular/core';

import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {

  client: Client;
  clientForm: FormGroup;

  constructor(private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap( ( params: ParamMap ) => this.clientsService.getClientById(params.get('id')))
    .subscribe((client) => {
      this.client = client;
    });
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required ],
    });
  }

  public getBirthday() {
    return moment(this.client.clientbirthday, moment.ISO_8601).format('DD/MM/YYYY');
  }

  public planClient(client: Client): void {
    this.router.navigate(['/plan', client._id]);
  }

}
