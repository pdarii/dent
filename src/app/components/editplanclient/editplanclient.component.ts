import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClientsService} from '../../services/clients.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editplanclient',
  templateUrl: './editplanclient.component.html',
  styleUrls: ['./editplanclient.component.scss']
})
export class EditplanclientComponent implements OnInit {

  public event: any;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.initParamsSubscription();
  }

  private initParamsSubscription() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        this.clientsService.getTimelineEventById(params.get('id'))
      ))
      .subscribe(event => {
        if (event.clientid) {
          this.clientsService.getClientById(event.clientid).subscribe((client) => {
            this.event = { event, client };
          });
        } else {
          this.event = {
            event,
            client: {
              tel: event.tel,
              _id: '',
            } };
        }
      });
  }
}
