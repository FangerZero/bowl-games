import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TeamData } from './team-data.model';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  createTeam(name: string, mascot: string, city: string, state: string, rank: number) {
    const teamData: TeamData = {name, mascot, city, state, rank};
    this.http.post(`${environment.api_url}/teams/`, teamData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
