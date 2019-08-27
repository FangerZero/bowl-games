import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
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

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post(`${environment.api_url}/users/`, authData)
      .subscribe(response => {
        console.log(response);
        // this.login(email, password);
      });
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

  logout() {
    this._userIsAdmin = false;
    this._token = undefined;
  }
}
