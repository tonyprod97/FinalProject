import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserJSON() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserId() {
    return this.getUserJSON().id;
  }
}
