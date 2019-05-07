import { apiUrl } from './../constants/proxy';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return user;
            }));
    }

    register(username: string, password: string, firstName: string, lastName: string): Observable<any> {
      return this.http.post<any>(`${apiUrl}/users/register`,
                  { username, password, firstName, lastName}
      );
    }

    logout() {
      localStorage.removeItem('user');
    }

    isUserLogedIn() {
      return localStorage.getItem('user');
    }
}
