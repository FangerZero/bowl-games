import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bowl } from './bowl.model';

@Injectable({
  providedIn: 'root'
})
export class BowlsService {
  get bowls() {
    return this.http.get<Bowl[]>('http://localhost:3000/api/bowls/');
  }

  constructor(private http: HttpClient) { }
}
