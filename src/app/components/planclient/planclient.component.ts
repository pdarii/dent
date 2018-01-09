import { Component, OnInit } from '@angular/core';

import { Client, Jobs, Plan } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';


@Component({
  selector: 'app-planclient',
  templateUrl: './planclient.component.html',
  styleUrls: ['./planclient.component.css']
})
export class PlanclientComponent implements OnInit {

  public clientForm: FormGroup;
  public client: Client;
  private plan: Plan;
  public jobs: Jobs;
  public clientplantime: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private fb: FormBuilder ) {
    this.createForm();
   }

  ngOnInit() {
    this.getJobs();
    this.initParamsSubscription();
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientphone: ['', Validators.required],
      clientplandate: ['', Validators.required],
      clientcomment: [''],
      clientjob: [''],
    });
  }

  public planClient(client) {
    console.log(client);

    // if (client) {
    //   client.clientbirthday = moment(client.clientbirthday).toISOString();
    //   this.clientsService.addClient(client).subscribe((addedClient: Client) => {
    //     console.log(addedClient);
    //   });
    // }
  }

  public onSubmit() {
    this.planClient(this.clientForm.value);
  }

  private initParamsSubscription() {
    this.route.paramMap
    .switchMap( ( params: ParamMap ) => this.clientsService.getClientById(params.get('id')))
    .subscribe((client) => {
      this.client = client;
    });
  }

  private getJobs() {
    this.clientsService.getJobs().subscribe((jobs: Jobs) => {
      this.jobs = jobs;
    });
  }

}
