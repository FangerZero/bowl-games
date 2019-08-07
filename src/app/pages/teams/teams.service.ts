import { Injectable } from '@angular/core';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // tslint:disable-next-line: variable-name
  private _teams: Team[] = [
    new Team(1, 'University of Wisconsin', 'Madison', 'Wisconsin'),
    new Team(2, 'University of Nebraska-Lincoln', 'Lincoln', 'Nebraska')
  ];

  get teams() {
    return [...this._teams];
  }
  constructor() { }
}
