import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';

import { ClientsService } from './../../services/clients.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  locale = 'uk';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private clientsService: ClientsService) {
    moment.locale(this.locale);
  }

  ngOnInit() {
    console.log(moment.locales());
    this.bsConfig = Object.assign({}, { locale: this.locale });

  }

  public addClient() {
    const data = ' ';
    this.clientsService.addClient(data).subscribe((id) => {
      console.log(`Client added ${id}`);
    });
  }

}
