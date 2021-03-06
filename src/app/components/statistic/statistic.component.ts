import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientsService } from './../../services/clients.service';
import { CHART_OPTIONS } from './statistic.constants';
import * as moment from 'moment';

declare let d3: any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: [
    './statistic.component.css',
    './../../../../node_modules/nvd3/build/nv.d3.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class StatisticComponent implements OnInit {
  public options;
  public data = [];
  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.getClients();
    this.options = CHART_OPTIONS;
  }

  getClients() {
    const period = moment()
      .subtract(6, 'months')
      .minute(0)
      .second(0)
      .millisecond(0);

    this.clientsService.getPacients({
      value: period.toDate(),
    }).subscribe(chartData => {
      this.formatData(chartData);
    });
  }

  private formatData(chartData) {
    this.data = [
      {
        key: 'Данні по клієнтам',
        values: [],
      },
    ];
    for (const key in chartData) {
      if (chartData[key]) {
        this.data[0].values.push({
          label: key,
          value: chartData[key],
        });
      }
    }
  }
}
