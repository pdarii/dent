import { Component, OnInit, Input } from '@angular/core';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() clientId: string;

  public timelineEvents: any;
  public doctors: any;

  constructor(
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.getTimelineEvents();
    this.getDoctors();
  }

  private getTimelineEvents() {
    this.clientsService.getTimelineEvents(this.clientId).subscribe((timelineEvents: any) => {
      this.timelineEvents = timelineEvents;
    });
  }

  private getDoctors() {
    this.clientsService.getDoctors().subscribe((doctors: any) => {
      this.doctors = doctors;
    });
  }

  public getDoctorNameById(id) {
    const doc = this.doctors.filter((doctor) => doctor._id === id);
    return doc && doc.length ? `${doc[0].name} ${doc[0].surname}` : '';
  }

}
