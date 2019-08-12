import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  get teams() {
    return this.http.get<Team[]>('http://localhost:3000/api/teams/');
  }

  constructor(private http: HttpClient) { }
}
