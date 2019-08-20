import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  private _token: string;
  // Push Token to Interested Components
  private _authStatusListener = new Subject<boolean>();

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get token() {
    return this._token;
  }

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

  getAuthStatusListener() {
    return this._authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post('http://localhost:3000/api/users/', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post<{token: string}>('http://localhost:3000/api/users/login', authData)
    .subscribe(response => {
      const token = response.token;
      this._token = token;
      if (token) {
        this._authStatusListener.next(true);
        this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          loadingEl.dismiss();
          this.router.navigateByUrl('/games');
        });
      }
    });

    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
    this._token = undefined;
  }
}
