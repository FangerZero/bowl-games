import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { Selection } from './selection-data.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionsService {
    // tslint:disable-next-line: variable-name
    private _selections: Selection[];

    get selections() {
        return this.http.get<Selection[]>('http://localhost:3000/api/selections/');
    }

    constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }
}
