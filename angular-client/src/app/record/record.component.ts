import { PeriodPickerRequest } from './../interfaces/period-picker-request';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LogService } from '../services/log.service';
import { Subscription, Observable } from 'rxjs';
import { Log } from './../models/log';
import { Response } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit,OnDestroy {

  form: FormGroup;
  updateRecordSubscription: Subscription;
  activeLog: Log;
  errorMessage = '';

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar,
     private logService: LogService, private router: Router) { }

  ngOnInit() {
    this.resetActiveLog();
    this.createForm();
    this.logService.getAllLogsForUser();

    this.updateRecordSubscription = this.logService.updateRecordActiveLogSubject.asObservable().subscribe((log: Log) => {
      let tempDate = new Date(log.date);
      if(this.shouldIncreaseDate(log.date)) tempDate.setDate(tempDate.getDate()+1);
      this.activeLog = {
        value: log.value,
        date: tempDate,
        id: log.id
      };
      this.createForm();
    })
  }

  onSave() {
    if(this.checkIfLogExistst()) return;
    let log = {
      value: this.form.value.value,
      date: new Date(this.form.value.date),
      id: null
    };

    const reply= (data: Log) => {
      data.date = new Date(data.date);
      this.logService.createdRecordSubject.next(data);
      this.openSnackBar('Log successfully saved');
      this.logService.statisticChangedSubject.next();
    };

    this.resetActiveLog();
    this.handleApiResponse(this.logService.create(log), reply);
  }

  private checkIfLogExistst() : boolean {
    let date = (new Date(this.form.value.date)).toLocaleDateString();
    let log = this.logService.logs.find(l => {
      let tempDate =(new Date(l.date)).toLocaleDateString();
      return tempDate === date;
    });

    if(log) {
      this.errorMessage = `You already logged weight on: ${date}`;
      this.logService.updateRecordActiveLogSubject.next(log);
      return true;
    } else {
      return false;
    }
  }

  onUpdate() {
    let updatedLog: Log = {
      value: this.form.value.value,
      id: this.activeLog.id,
      date: new Date(this.form.value.date)
    }
    const reply = (data: Log) => {
        data.date = new Date(data.date);
        this.logService.createdRecordSubject.next(data);
        this.openSnackBar('Log successfully updated');
        this.logService.statisticChangedSubject.next();
      };

    this.handleApiResponse(this.logService.update(updatedLog), reply);
  }

  onDelete() {
    const reply = (id: number) => {
      this.logService.deletedRecordSubject.next(id);
      this.logService.statisticChangedSubject.next();
      this.openSnackBar('Log successfully deleted');
    }
    this.handleApiResponse(this.logService.delete(this.activeLog.id), reply);
  }

  private handleApiResponse(response: Observable<number | Log>, reply) {
    response.subscribe(log => {
      reply(log);
    }, err => this.router.navigate(['error']));
    this.resetActiveLog();
  }

  private createForm() {
    this.form = this.fb.group({
      date: new FormControl(this.activeLog.date.toISOString().split('T')[0]),
      value: new FormControl(this.activeLog.value, [Validators.required, Validators.min(0)])
    });
  }

  shouldIncreaseDate(date: Date): boolean {
    try {const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return !hours && !minutes && !seconds;
    } catch(ignorable) {
      return true;
    }
  }

  private resetActiveLog() {
    this.activeLog = {
      date: new Date(),
      value: null,
      id: null
    };
    this.errorMessage = '';
    this.createForm();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    this.updateRecordSubscription.unsubscribe();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,'Keep going!', {
      duration: 1000,
      verticalPosition: 'bottom'
    });
  }
}
