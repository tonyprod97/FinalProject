import { LogService } from './../services/log.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeriodPickerRequest } from '../interfaces/period-picker-request';
import { Statistic } from '../interfaces/statistic';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit, OnDestroy {

  requestedStatistic: Statistic;
  subscription: Subscription;
  period: PeriodPickerRequest;

  constructor(private logService: LogService, private router: Router) { }

  ngOnInit() {
    this.handleApiResponse(this.logService.statistic(undefined,undefined));
    this.subscription = this.logService.statisticChangedSubject.asObservable().subscribe(n => {
      this.period = null;
      if(this.requestedStatistic) {
        this.handleApiResponse(this.logService.statistic(this.requestedStatistic.from.toDateString(),this.requestedStatistic.to.toDateString()))
      } else {
        this.handleApiResponse(this.logService.statistic(undefined,undefined));
      }
    })
  }

  onRequest(request: PeriodPickerRequest) {
    this.period = request;
    this.handleApiResponse(this.logService.statistic(request.from,request.to));
  }

  private handleApiResponse(res: Observable<any>) {
    res.subscribe(res => {
      if(res) {
        this.requestedStatistic = {...res};
        this.requestedStatistic.from = new Date(res.from);
        this.requestedStatistic.to = new Date(res.to);
      }else this.requestedStatistic = null
    }, err => this.router.navigate(['error']));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
