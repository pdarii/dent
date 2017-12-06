import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
  }

  public addClient() {
    

    this.clientsService.addClient(data).subscribe((id) => {
      console.log(`Client added ${id}`);
    });
  }

}
