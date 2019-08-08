import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    console.log('authData', authData);

    this.http.post('http://localhost:3000/api/users/', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
