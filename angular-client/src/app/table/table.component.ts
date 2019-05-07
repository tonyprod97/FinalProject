import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { Log } from '../models/log';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnDestroy,OnChanges {
  displayedColumns: string[] = ['value','date'];
  dataSource = new MatTableDataSource<Log>();
  createdRecordSubscription: Subscription;
  deletedRecordSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: Array<Log>;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.createdRecordSubscription = this.logService.createdRecordSubject.asObservable().subscribe((data: Log) => {
      let newData = this.dataSource.data.filter(log => log.id !== data.id);
      newData.push(data);
      this.updateTable(newData);
    });

    this.deletedRecordSubscription = this.logService.deletedRecordSubject.asObservable().subscribe((id: number) => {
      let newData = this.dataSource.data.filter(log => log.id !== id);
      this.updateTable(newData);
    });
  }

  private updateTable(data: Array<Log>) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.logService.logs = data;
  }

  customSort(event) {
    if(event.direction === '') return;

    let data = this.dataSource.data.slice();

    if(event.active === 'value') {
      data = data.sort((a: Log, b: Log) => a.value - b.value);
    }
    if(event.active === 'date') {
      data = data.sort((a: Log, b: Log) => a.date.getTime()-b.date.getTime());
    }

    if(event.direction === 'desc') data = data.reverse();
    this.dataSource.data = data;
  }

  rowClicked(log: Log) {
    this.logService.updateRecordActiveLogSubject.next(log);
  }

  ngOnDestroy() {
    this.createdRecordSubscription.unsubscribe();
    this.deletedRecordSubscription.unsubscribe();
  }

  ngOnChanges() {
    if(this.data) this.updateTable(this.data);
  }

}
