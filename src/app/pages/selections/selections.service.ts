import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { environment } from '../../../environments/environment';
import { Selection } from './selection-data.model';
import { Bowl } from '../games/bowl.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionsService {
    get selections() {
        return this.http.get<Selection[]>(`${environment.api_url}/selections/`);
    }

    get games() {
      return this.http.get<Bowl[]>(`${environment.api_url}/games/`);
    }

    constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

    updateSelection(data: object) {
      this.http.patch(`${environment.api_url}/selections/`, data).subscribe();
    }

    createSelection(data: object) {
      this.http.post(`${environment.api_url}/selections/`, data).subscribe();
    }
}
