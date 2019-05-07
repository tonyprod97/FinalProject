import { LogService } from './../services/log.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private logservice: LogService) { }

  ngOnInit() {
  }

  refreshStatistic() {
    this.logservice.statisticChangedSubject.next();
  }
}
