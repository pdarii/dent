import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';

import { ClientsService } from './../../services/clients.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  public clientForm: FormGroup;

  // locale = 'uk';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private clientsService: ClientsService, private fb: FormBuilder) {
    // moment.locale(this.locale);
    this.createForm();
  }

  private createForm() {
    this.clientForm = this.fb.group({
      // clientname: ['', Validators.required],
      // clientsurname: ['', Validators.required],
      // clientphone: ['', Validators.required],
      // clientbirthday: ['', Validators.required],
      clientname: [''],
      clientsurname: [''],
      clientphone: [''],
      clientbirthday: [''],
      clientcomment: [''],
    });
  }



  public ngOnInit() {
    console.log(moment.locales());
    // this.bsConfig = Object.assign({}, { locale: this.locale });
  }

  public addClient(client) {
    if (client) {
      client.clientbirthday = moment(client.clientbirthday).toISOString();
      console.log(client);
      this.clientsService.addClient(client).subscribe((id) => {
        console.log(`Client added ${id}`);
      });
    }
  }

  public onSubmit() {
    this.addClient(this.clientForm.value);
  }

}
