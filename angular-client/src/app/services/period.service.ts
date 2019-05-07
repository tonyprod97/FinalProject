import { Injectable } from '@angular/core';
import { PeriodPickerRequest } from '../interfaces/period-picker-request';
import { UserService } from './user.service';
import { apiUrl } from '../constants/proxy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private userService: UserService, private http: HttpClient) { }

  getLogs(request :PeriodPickerRequest) {
    let body = {
      from: request.from,
      to: request.to,
      userId: this.userService.getUserId()
    };
    return this.http.post<any>(`${apiUrl}/logs/get/period`, body);
  }
}
