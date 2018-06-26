import {Component, Input, OnInit, TemplateRef} from '@angular/core';

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

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  @Input() event: any = false;
  modalRef: BsModalRef;
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
    private localeService: BsLocaleService,
    private modalService: BsModalService
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

    if (this.event) {
      this.setClientAndEvent(this.event);
    } else {
      this.initParamsSubscription();
    }
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

  private setClientAndEvent({event, client}) {
    const jsDate = moment(event.datetime).toDate();
    this.clientplantime = jsDate;
    this.client = client;
    this.clientForm.patchValue({
      clientphone: client.tel,
      clientid: client._id,
      clientplandate: jsDate,
      clientplantime: event.datetime,
      clientcomment: event.jobdone,
      clientjob: event.jobtype,
      doctor: event.doctor,
    });
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
      if (!this.event) {
        this.clientForm.patchValue({
          clientjob: jobs[0]._id,
        });
      }
      this.showSpinner = false;
    });
  }

  private getDoctors() {
    this.showSpinner = true;
    this.clientsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      if (!this.event) {
        this.clientForm.patchValue({
          doctor: doctors[0]._id,
        });
      }
      this.showSpinner = false;
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private confirm(): void {
    this.deleteEvent(this.event.event._id);
    this.modalRef.hide();
  }

  private decline(): void {
    this.modalRef.hide();
  }

  private deleteEvent(id) {
    this.clientsService.deleteEvent(id).subscribe((result: any) => {
      if (result.n > 0) {
        this.router.navigate([`/edit/${this.event.client._id}`]);
      } else {
        console.error(result);
      }
    });

  }
}
