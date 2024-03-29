import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rank } from '../ranks/rank.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RanksService {
  get ranks() {
    return this.http.get<Rank[]>(`${environment.api_url}/users/ranks/`);
  }

  constructor(private http: HttpClient) { }
}
