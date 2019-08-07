import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  // tslint:disable-next-line: variable-name
  private _games: Game[] = [
    new Game(1, 1, 1, 2, new Date(), 'CBS', 5),
    new Game(2, 2, 3, 4, new Date(), 'FOX', 2),
  ];

  get games() {
    return [...this._games];
  }

  constructor() { }
}
