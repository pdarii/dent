import { Component, OnInit } from '@angular/core';

import { Client, Jobs, Plan } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
defineLocale('ru', ruLocale);

import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

import { getTimepickerConfig } from './planclient.constants';

import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';

@Component({
  selector: 'app-planclient',
  templateUrl: './planclient.component.html',
  styleUrls: ['./planclient.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class PlanclientComponent implements OnInit {
  public clientForm: FormGroup;
  public client: Client;
  private plan: Plan;

  public jobs: Jobs;
  // @TODO interfaces
  public doctors: any;

  public clientplantime: Date = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;
  public showSpinner = true;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('ru');
    this.createForm();
  }

  ngOnInit() {
    this.bsConfig = {
      ...this.bsConfig,
      dateInputFormat: 'DD.MM.YYYY'
    };
    this.getJobs();
    this.getDoctors();
    this.initParamsSubscription();
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientphone: ['', Validators.required],
      clientplandate: ['', Validators.required],
      clientplantime: ['', Validators.required],
      clientcomment: [''],
      clientjob: [''],
      doctor: [''],
      clientid: [''],
    });
  }

  private planClient(client) {

    const planDate = moment(client.clientplandate);
    const planTime = moment(client.clientplantime);
    const planTimeHours = planTime.hour();
    const planTimeMinutes = planTime.minute();

    const clientData = {
      ...client,
      plandate: planDate.hour(planTimeHours).minute(planTimeMinutes).toDate(),
    };

    this.clientsService.planClient(clientData).subscribe((plannedClient) => {
      this.router.navigate([`/edit/${plannedClient.clientid}`]);
    });
  }

  public onSubmit() {
    this.planClient(this.clientForm.value);
  }

  private initParamsSubscription() {
    this.showSpinner = true;
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.clientsService.getClientById(params.get('id'))
      )
      .subscribe(client => {
        this.client = client;
        this.clientForm.patchValue({
          clientphone: client.tel,
          clientid: client._id,
        });
        this.showSpinner = false;
      });
  }

  private getJobs() {
    this.showSpinner = true;
    this.clientsService.getJobs().subscribe((jobs: Jobs) => {
      this.jobs = jobs;
      this.clientForm.patchValue({
        clientjob: jobs[0]._id,
      });
      this.showSpinner = false;
    });
  }

  private getDoctors() {
    this.showSpinner = true;
    this.clientsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.clientForm.patchValue({
        doctor: doctors[0]._id,
      });
      this.showSpinner = false;
    });
  }
}
