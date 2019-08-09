import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  get games() {
    return this.http.get<Game[]>('http://localhost:3000/api/games/');
  }

  constructor(private http: HttpClient) { }
}
