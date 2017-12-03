import { Component, OnInit } from '@angular/core';

import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-planclient',
  templateUrl: './planclient.component.html',
  styleUrls: ['./planclient.component.css']
})
export class PlanclientComponent implements OnInit {

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {

  }

}
