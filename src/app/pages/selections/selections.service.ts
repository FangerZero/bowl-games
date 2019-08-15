import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { Selection } from './selection-data.model';
import { Game } from '../games/game.model';
import { Bowl } from '../games/bowl.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionsService {
    // private _selections: Selection[];
    // private _games: Bowl[];

    get selections() {
        return this.http.get<Selection[]>('http://localhost:3000/api/selections/');
    }

    get games() {
      return this.http.get<Bowl[]>('http://localhost:3000/api/games/');
    }

    constructor(private http: HttpClient, private loadingCtrl: LoadingController, private router: Router) { }

    updateSelection(data: object) {
      this.http.patch('http://localhost:3000/api/selections/', data).subscribe();
    }

    createSelection(data: object) {
      this.http.post('http://localhost:3000/api/selections/', data).subscribe();
    }
}
