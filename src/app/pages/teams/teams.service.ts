import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  get teams() {
    return this.http.get<Team[]>(`${environment.api_url}/teams/`);
  }

  constructor(private http: HttpClient) { }
}
