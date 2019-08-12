import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  private _token: string;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get token() {
    console.log('Returning Token: ', this._token);
    return this._token;
  }

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

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
