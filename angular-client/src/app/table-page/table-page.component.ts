import { Component, OnInit } from '@angular/core';
import { Log } from '../models/log';
import { PeriodPickerRequest } from './../interfaces/period-picker-request';
import { LogService } from '../services/log.service';
import { Observable } from 'rxjs';
import { PeriodService } from '../services/period.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  activeLog: Log;
  tableData: Array<Log>;

  constructor(private logService: LogService, private periodService: PeriodService, private router: Router) { }

  ngOnInit() {
    this.handleApiResponse(this.logService.getAllLogsForUser());
  }

  rowClicked(log: Log) {
      this.activeLog = log;
  }

  periodRequest(request: PeriodPickerRequest) {
    this.handleApiResponse(this.periodService.getLogs(request));
  }

  private handleApiResponse(response: Observable<Log[]>) {
    response.subscribe(data => {
      let dataSrc = new Array<Log>();
      data.forEach( log => {
        dataSrc.push({
          value: log.value,
          date: new Date(log.date),
          id: log.id
        });
      });

      this.tableData = dataSrc;
    },
      err => this.router.navigate(['error']));
  }
}
