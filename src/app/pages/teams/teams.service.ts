import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  // tslint:disable-next-line: variable-name
  private _teams: Team[] = [];

  get teams() {
    return this.http.get<Team[]>('http://localhost:3000/api/teams/');
  }

  constructor(private http: HttpClient) { }

}
