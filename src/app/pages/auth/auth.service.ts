import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { AuthSignupData } from './auth-signup-data.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAdmin = false;
  private _token: string;
  // Push Token to Interested Components
  private _authStatusListener = new Subject<boolean>();
  private _adminStatusListener = new Subject<boolean>();
  private loginTimer: any;

  get userIsAdmin() {
    return this._userIsAdmin;
  }

  get token() {
    return this._token;
  }

  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

  getAuthStatusListener() {
    return this._authStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this._adminStatusListener.asObservable();
  }

  createUser(email: string, password: string, name: string, alias: string) {
    const authData: AuthSignupData = { email, password, name, alias };
    this.http.post(`${environment.api_url}/users/`, authData)
      .subscribe(response => {
        this.login(email, password);
      });
  }

  recoverPassword() {
    console.log('Need to recover Password');
   /* this.http.get(`${environment.api_url}/users/recover`)
    .subscribe(response => {
      console.log('FML');
    });
    */
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    if (userData.token) {
      this._token = userData.token;
      this._authStatusListener.next(true);
      this.autoLogout();

      this._userIsAdmin = userData.admin || false;
      this._adminStatusListener.next(userData.admin || false);
    }
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post<{token: string, isAdmin: boolean}>(`${environment.api_url}/users/login`, authData)
    .subscribe(response => {
      this._userIsAdmin = response.isAdmin;
      this._adminStatusListener.next(response.isAdmin);

      const token = response.token;
      this._token = token;
      if (token) {
        // Stay Logged in on Reload
        let userData = {};
        if (this._userIsAdmin) {
          userData = { admin: true, token };
        } else {
          userData = { token };
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        this.autoLogout();

        this._authStatusListener.next(true);
        this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          loadingEl.dismiss();
          this.router.navigateByUrl('/games');
        });
      }
    });
  }

  autoLogout() {
    this.loginTimer = setTimeout(() => {
      this.logout();
    }, 60 * 60 * 1000);
  }

  logout() {
    this._userIsAdmin = false;
    this._token = undefined;
    // localStorage.clear();
    localStorage.removeItem('userData');
    if (this.loginTimer) {
      clearTimeout(this.loginTimer);
    }
    this.loginTimer = null;
  }
}
