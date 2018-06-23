import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientsService } from './../../services/clients.service';
import { Client } from './../../interfaces/client';

import {
  ValidateName,
  ValidatePhone,
} from './../../validators/client.validator';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
defineLocale('ru', ruLocale);

import * as moment from 'moment';


@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css'],
})
export class AddclientComponent implements OnInit {

  public clientForm: FormGroup;
  public addedClient: Client;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('ru');
    this.createForm();
  }


  public ngOnInit() {
    this.bsConfig = {
      ...this.bsConfig,
      dateInputFormat: 'DD.MM.YYYY'
    };
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          ValidateName,
        ],
      ],
      clientfather: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(15),
          ValidateName,
        ],
      ],
      clientsurname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          ValidateName,
        ],
      ],
      clientphone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          ValidatePhone,
        ],
      ],
      clientbirthday: ['', Validators.required],
      clientcomment: [''],
    });
  }

  public addClient(client) {
    if (client) {
      client.clientbirthday = moment(client.clientbirthday).toISOString();
      this.clientsService.addClient(client).subscribe((addedClient: Client) => {
        this.addedClient = addedClient;
        this.router.navigate([`/edit/${addedClient._id}`]);
      });
    }
  }

  public onSubmit() {
    this.addClient(this.clientForm.value);
  }
}
