import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { Selection } from './selection-data.model';
import { Game } from '../games/game.model';
import { BowlGame } from './bowlGame.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionsService {
    // tslint:disable-next-line: variable-name
    private _selections: Selection[];
    private _games: BowlGame[];

    get selections() {
        return this.http.get<Selection[]>('http://localhost:3000/api/selections/');
    }

    get games() {
      return this.http.get<BowlGame[]>('http://localhost:3000/api/games/');
    }

    constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

    updateSelection() {
      console.log("UpdateSelection Service/");
      /*
      const data = {};
      this.http.post<>('http://localhost:3000/api/', data)
      .subscribe(response => {
        console.log(response);
      });*/
    }
}
