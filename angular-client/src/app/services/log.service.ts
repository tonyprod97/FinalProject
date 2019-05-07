import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { apiUrl } from "../constants/proxy";
import { UserService } from "./user.service";
import { Log } from "../models/log";
import { PeriodPickerRequest } from "../interfaces/period-picker-request";

@Injectable({
  providedIn: "root"
})
export class LogService {
  public createdRecordSubject: Subject<Log> = new Subject();
  public updateRecordActiveLogSubject: Subject<Log> = new Subject();
  public deletedRecordSubject: Subject<number> = new Subject();
  public statisticChangedSubject = new Subject();
  public logs : Array<Log> ;

  constructor(private http: HttpClient, private userService: UserService) {
    this.createdRecordSubject.asObservable().subscribe(log => this.logs.push(log));
    this.deletedRecordSubject.asObservable().subscribe(id => {
      this.logs = this.logs.filter(l => l.id !== id)
    })
  }

  getAllLogsForUser(): Observable<any> {
    var response = this.http.get<any>(
      `${apiUrl}/logs/get/${this.userService.getUserId()}`
    );

    response.subscribe(data => {
      this.logs = data;
    })
    return response;
  }

  statistic(from, to): Observable<any> {
    let body = {
      userId: this.userService.getUserId(),
      from,
      to
    };
    return this.http.post<any>(`${apiUrl}/logs/statistic`, body);
  }

  create(log): Observable<any> {
    let logForServer = {
      value: log.value,
      date: log.date,
      userId: this.userService.getUserId()
    };

    return this.http.post<any>(`${apiUrl}/logs/create`, logForServer);
  }

  update(log: Log): Observable<any> {
    let logForServer = {
      value: log.value,
      date: log.date,
      id: log.id,
      userId: this.userService.getUserId()
    };
    return this.http.post<any>(`${apiUrl}/logs/update`, logForServer);
  }

  delete(logId: number): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/logs/${logId}`);
  }
}
