import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { BowlGame } from './bowlGame.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  get games() {
    return this.http.get<BowlGame[]>('http://localhost:3000/api/games/');
  }

  constructor(private http: HttpClient) { }
}
