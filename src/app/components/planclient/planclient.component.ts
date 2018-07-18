import {Component, Input, OnInit, TemplateRef} from '@angular/core';

import { Client, Jobs, Plan } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';



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
import { ValidatePhone } from '../../validators/client.validator';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-planclient',
  templateUrl: './planclient.component.html',
  styleUrls: ['./planclient.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class PlanclientComponent implements OnInit {

  @Input() event: any = false;
  modalRef: BsModalRef;
  public clientForm: FormGroup;
  public client: Client;

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

  public getClientName(client) {
    return client.name ? `${client.name || ''} ${client.father  || ''} ${client.surname  || ''}` : 'Анонім';
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientphone: ['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          ValidatePhone,
        ]
      ],
      clientplandate: ['', Validators.required],
      clientplantime: ['', Validators.required],
      clientcomment: [''],
      clientjob: [''],
      doctor: [''],
      clientid: [''],
    });
  }

  private combineDates(clientplandate, clientplantime) {
    const planDate = moment(clientplandate);
    const planTime = moment(clientplantime);
    const planTimeHours = planTime.hour();
    const planTimeMinutes = planTime.minute();
    return planDate.hour(planTimeHours).minute(planTimeMinutes).toDate();
  }

  private editEvent(formData) {
    const editedData = {
      ...this.event.event,
      datetime: this.combineDates(formData.clientplandate, formData.clientplantime),
      doctor: formData.doctor,
      jobdone: formData.clientcomment,
      jobtype: formData.clientjob,
    };
    this.clientsService.editPlanClient(editedData).subscribe((clientid) => {
      this.successRedirect(clientid);
    });
  }

  private planEvent(formData) {
      const newData = {
        ...formData,
        plandate: this.combineDates(formData.clientplandate, formData.clientplantime),
      };
      this.clientsService.planClient(newData).subscribe((plannedClient) => {
        this.successRedirect(plannedClient.clientid);
      });
  }

  public onSubmit() {
    if (this.event) {
      this.editEvent(this.clientForm.value);
    } else {
      this.planEvent(this.clientForm.value);
    }
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
      .pipe(switchMap((params: ParamMap) =>
        this.clientsService.getClientById(params.get('id'))
      ))
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
        this.successRedirect(this.event.client._id);
      } else {
        console.error(result);
      }
    });

  }

  private successRedirect(clientid) {
    if (clientid) {
      this.router.navigate([`/edit/${clientid}`]);
    } else {
      this.router.navigate([`/clients`]);
    }
  }

}
