import { Component, OnInit, ViewChild } from '@angular/core';

import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown = false;

  client: Client;
  clientForm: FormGroup;

  constructor(private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap( ( params: ParamMap ) => this.clientsService.getClientById(params.get('id')))
    .subscribe((client) => {
      this.client = client;
      console.log(this.client);
    });
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.isModalShown = false;
    this.router.navigate(['/clients']);
  }

  private createForm(): void {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required ],
    });
  }

  public getBirthday(): string {
    return moment(this.client.clientbirthday, moment.ISO_8601).format('DD/MM/YYYY');
  }

  public planClient(id: string): void {
    this.router.navigate(['/plan', id]);
  }

  public deleteClient(id: string): void {
    this.clientsService.deleteClient(id).subscribe((result: any) => {
      if (result.n > 0) {
        this.showModal();
      }
    });
  }

}
