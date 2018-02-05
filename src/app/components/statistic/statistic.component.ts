import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientsService } from './../../services/clients.service';
import { CHART_OPTIONS } from './statistic.constants';

declare let d3: any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css', './../../../../node_modules/nvd3/build/nv.d3.css', ],
  encapsulation: ViewEncapsulation.None
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
    this.clientsService.getPacients().subscribe(chartData => {
     this.formatData(chartData);
    });
  }

  private formatData(chartData) {
    this.data = [
      {
        key: 'Данні по клієнтам',
        values: [],
      }
    ];
    for (const key in chartData) {
      if (chartData[key]) {
        this.data[0].values.push({
          'label': key,
          'value': chartData[key],
        });
      }
    }
  }


}











/*


private chartData: Array<any>;

constructor(private clientsService: ClientsService) {}

ngOnInit() {

  this.getClients();
}

getClients() {
  console.log('getClients');
  const data = this.generateData();
  console.log(data);
  this.clientsService.getPacients().subscribe(chartData => this.chartData = chartData);
}

generateData() {
  const chartData = [];
  for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    chartData.push([
      `Index ${i}`,
      Math.floor(Math.random() * 100)
    ]);
  }
  return chartData;
}
*/
