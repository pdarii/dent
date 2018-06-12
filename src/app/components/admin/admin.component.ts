import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../services/clients.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public showSpinner = false;

  // @TODO Interfaces
  public doctors: any;
  public jobs: any;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.getDoctors();
    this.getJobs();
  }

  getJobs() {
    this.showSpinner = true;
    this.clientsService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
      console.log(jobs);
      this.showSpinner = false;
    });
  }

  addJob() {}

  removeJob() {}

  getDoctors() {
    this.showSpinner = true;
    this.clientsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      console.log(doctors);
      this.showSpinner = false;
    });
  }

  addDoctor() {}

  removeDoctor() {}
}
