import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { BowlGame } from './bowlGame.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  get games() {
    return this.http.get<BowlGame[]>(`${environment.api_url}/games/`);
  }

  constructor(private http: HttpClient) { }
}
