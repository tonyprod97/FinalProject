import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeriodPickerRequest } from './../interfaces/period-picker-request';

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.css']
})
export class PeriodPickerComponent implements OnInit {

  @Input('from') from: Date;
  @Input('to') to: Date;

  @Output('request') request = new EventEmitter<PeriodPickerRequest>();

  constructor() { }

  ngOnInit() {
    //default values provided if not defined
    if(this.to === undefined) this.to = new Date();
    if(this.from === undefined){
      this.from = new Date();
      this.from.setMonth(this.to.getMonth()-1);
    }
  }

  dateChanged(identifier: boolean, event) {
    if(identifier) this.to = new Date(event.value);
    if(!identifier) this.from = new Date(event.value);
  }

  onRequest() {
    this.request.emit({
      from: this.from,
      to: this.to
    });
  }

  private validateDates(): boolean {
    //return value is used for disable button property
    if(this.to.getTime() > this.from.getTime()) {
      return false;
    }
    return true;
  }

}
