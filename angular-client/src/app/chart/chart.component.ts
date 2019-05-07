import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { ChartItem } from '../interfaces/chart';
import { Log } from '../models/log';
import { PeriodPickerRequest } from '../interfaces/period-picker-request';
import { LogService } from './../services/log.service';
import { PeriodService } from './../services/period.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  dataPoints = new Array<ChartItem>();
  chartTitle;

  constructor(private logService: LogService, private periodService: PeriodService, private router: Router) { }

  ngOnInit() {
    this.handleApiResponse(this.logService.getAllLogsForUser(), 'Since started logging');
  }

  private createChart() {

    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1",
      zoomEnabled: true,
      title: {
        text: this.chartTitle,
        fontColor: "#616161"
      },
      toolTip: {
        shared: true
      },
      axisX: {
        valueFormatString: "MMM YYYY",
        title: "Date",
        titleFontColor: "#616161",
        gridColor: "#8d8d8d" ,
        gridThickness: 2
      },
      axisY: {
        title: "Weight",
        titleFontColor: "#616161",
        suffix: " kg",
        gridColor: "#bdbdbd",
        minimum: 0
      },
      data: [{
        type: "line",
        color: "#9c4dcc",
        lineColor: "#29434e",
        name: "kg",
        dataPoints: this.dataPoints
      }]
    });
    chart.render();
  }

  periodRequest(request: PeriodPickerRequest) {
    this.dataPoints = new Array<ChartItem>();
    this.handleApiResponse(this.periodService.getLogs(request), `From: ${request.from.toLocaleDateString()} - To: ${request.to.toLocaleDateString()}`);
  }

  private handleApiResponse(response: Observable<Log[]>, title: String) {
    response.subscribe((data: Log[]) => {
      data.forEach((log: Log) => {
        this.dataPoints.push({
          x: new Date(log.date),
          y: log.value
        });
      });
      this.chartTitle = title;
      this.createChart();
    }, err => this.router.navigate(['error']));
  }
}
