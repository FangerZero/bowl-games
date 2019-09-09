import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { TeamData } from './team-data.model';
import { Team } from './team.model';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  get teams() {
    return this.http.get<Team[]>(`${environment.api_url}/teams/`);
  }

  constructor(private http: HttpClient, private router: Router) { }

  getTeam(id: number) {
    return this.http.get<Team>(`${environment.api_url}/teams/${id}`);
  }

  createTeam(name: string, mascot: string, city: string, state: string, rank: number) {
    const teamData: TeamData = {name, mascot, city, state, rank};
    this.http.post(`${environment.api_url}/teams/`, teamData).subscribe();
  }

  updateTeam(id: number, name: string, mascot: string, city: string, state: string, rank: number) {
    const teamData: TeamData = {name, mascot, city, state, rank};
    this.http.patch(`${environment.api_url}/teams/${id}`, teamData).subscribe();
  }

  deleteTeam(id: number) {
    this.http.delete(`${environment.api_url}/teams/${id}`).subscribe();
    this.router.navigateByUrl(`admin/teams`);
  }
}
