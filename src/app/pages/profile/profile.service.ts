import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../profile/profile-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  get profile() {
    return this.http.get<Profile>(`${environment.api_url}/users/profile`);
  }

  constructor(private http: HttpClient) { }

  updateProfile(data: object) {
    this.http.patch(`${environment.api_url}/users/`, data).subscribe();
  }

  addPushSubscriber(data: any) {
    return this.http.patch(`${environment.api_url}/users/sub`, data);
  }
}
