import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BowlData } from './bowl-data.model';
import { Bowl } from './bowl.model';

@Injectable({
  providedIn: 'root'
})
export class BowlsService {
  get bowls() {
    return this.http.get<Bowl[]>(`${environment.api_url}/bowls/`);
  }

  constructor(private http: HttpClient) { }

  getBowl(id: number) {
    return this.http.get<Bowl>(`${environment.api_url}/bowls/${id}`);
  }

  createBowl(name: string) {
    const bowlData: BowlData = {name};

    this.http.post(`${environment.api_url}/bowls/`, bowlData).subscribe(
      response => { console.log(response); }
    );
  }

  updateBowl(id: number, name: string) {
    const bowlData: BowlData = {name};
    this.http.patch(`${environment.api_url}/bowls/${id}`, bowlData).subscribe();
  }
}
