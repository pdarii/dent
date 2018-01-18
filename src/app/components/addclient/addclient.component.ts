import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';

import { ClientsService } from './../../services/clients.service';
import { Client } from './../../interfaces/client';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateName, ValidatePhone } from './../../validators/client.validator';
import {Router} from '@angular/router';


@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown = false;

  public clientForm: FormGroup;
  public addedClient: Client;

  // locale = 'uk';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private clientsService: ClientsService, private fb: FormBuilder, private router: Router ) {
    // moment.locale(this.locale);
    this.createForm();
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  private createForm() {
    this.clientForm = this.fb.group({
      clientname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        ValidateName
      ]],
      clientsurname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        ValidateName
      ]],
      clientphone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        ValidatePhone
      ]],
      clientbirthday: ['', Validators.required],
      clientcomment: [''],
    });
  }

  public ngOnInit() {
   // console.log(moment.locales());
    // this.bsConfig = Object.assign({}, { locale: this.locale });
  }

  public addClient(client) {
    if (client) {
      client.clientbirthday = moment(client.clientbirthday).toISOString();
      this.clientsService.addClient(client).subscribe((addedClient: Client) => {
        this.addedClient = addedClient;
        console.log(addedClient);
        // this.showModal();
        this.router.navigate(['/clients']);
      });
    }
  }

  public onSubmit() {
    this.addClient(this.clientForm.value);
  }

}
