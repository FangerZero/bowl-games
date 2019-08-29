import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { GameData } from './game-data.model';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  get games() {
    return this.http.get<Game[]>(`${environment.api_url}/games/`);
  }

  constructor(private http: HttpClient) { }

  getGame(id: number) {
    return this.http.get<Game>(`${environment.api_url}/games/${id}`);
  }

  createGame(bowlId: number, teamId1: number, teamId2: number, teamScore1: number, teamScore2: number, date: Date, channel: string, points: number) {
    const gameData: GameData = {bowlId, teamId1, teamId2, teamScore1, teamScore2, date, channel, points};
    this.http.post(`${environment.api_url}/games/`, gameData).subscribe(
      response => { console.log(response); }
    );
  }

  updateGame(id: number, bowlId: number, teamId1: number, teamId2: number, teamScore1: number, teamScore2: number, date: Date, channel: string, points: number) {
    const gameData: GameData = {bowlId, teamId1, teamId2, teamScore1, teamScore2, date, channel, points};
    console.log('gameData', gameData);
    this.http.patch(`${environment.api_url}/games/${id}`, gameData).subscribe(
      response => { console.log(response); }
    );
  }

  updateUserRank() {
    console.log('update user please');
    this.http.get(`${environment.api_url}/users/ranks/set`).subscribe(
      response => { console.log(response); }
    );
  }
}
