import { Component, OnInit, TemplateRef } from '@angular/core';

import { Client } from './../../interfaces/client';
import { ClientsService } from './../../services/clients.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
defineLocale('ru', ruLocale);

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss'],
})
export class EditclientComponent implements OnInit {
  isEditMode = false;
  modalRef: BsModalRef;
  client: Client;
  clientForm: FormGroup;
  modalText: String;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private localeService: BsLocaleService
  ) {
    this.createForm();
    this.localeService.use('ru');
  }

  ngOnInit() {
    this.bsConfig = {
      ...this.bsConfig,
      dateInputFormat: 'DD.MM.YYYY'
    };
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.clientsService.getClientById(params.get('id'))
      )
      .subscribe(client => {
        this.client = client;
      });
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private confirm(): void {
    this.deleteClient(this.client._id);
    this.modalRef.hide();
  }

  private decline(): void {
    this.modalRef.hide();
  }

  public edit() {
    this.isEditMode = true;
  }

  public resetForm() {
    this.isEditMode = false;
  }

  private createForm(): void {
    this.clientForm = this.fb.group({
      clientname: ['', Validators.required],
      clientfather: [''],
      clientsurname: ['', Validators.required],
      clientphone: ['', Validators.required],
      clientbirthday: ['', Validators.required],
      clientcomment: [''],
    });
  }

  public getBirthday(): string {
    return moment(this.client.clientbirthday, moment.ISO_8601).format(
      'DD/MM/YYYY'
    );
  }

  public planClient(id: string): void {
    this.router.navigate(['/plan', id]);
  }

  public deleteClient(id: string): void {
    this.clientsService.deleteClient(id).subscribe((result: any) => {
      if (result.n > 0) {
          this.router.navigate(['/clients']);
      } else {
        console.error(result);
      }
    });
  }

  public onSubmit() {
    this.saveClient(this.clientForm.value);
  }

  public saveClient(client) {
    if (client) {
      client._id = this.client._id;
      client.clientbirthday = moment(client.clientbirthday).toISOString();
      this.clientsService.saveClient(client).subscribe(result => {
        if (result.nModified > 0) {
          this.modalText = 'Клієнт успішно відредагований';
        }
        this.isEditMode = false;
      });
    }
  }
}
