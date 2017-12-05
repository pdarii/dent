import { Component, OnInit } from '@angular/core';
import { ClientsService } from './../../services/clients.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  private chartData: Array<any>;

    constructor(private clientsService: ClientsService) {}

    ngOnInit() {
      // give everything a chance to get loaded before starting the animation to reduce choppiness
     /* setTimeout(() => {
        this.generateData();

        // change the data periodically
        setInterval(() => this.generateData(), 3000);
      }, 1000);*/
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

}
