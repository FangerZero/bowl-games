import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Profile } from '../profile/profile-data.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // Subscription Key
  readonly VAPID_PUBLIC_KEY = 'BIRnP5XEz-c7EjzVRhXv_VijdP9c-04X7cP-DQfeoZi3XrCKBrS1j17EqGfbhRvmNDI8oCXBWMaNT5-_arSjnvo';
  loadedProfile: Profile;
  disablePass = true;

  constructor(
    private profileService: ProfileService,
    private http: HttpClient,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this.profileService.profile.subscribe(profile => {
      this.loadedProfile = profile;
    });
  }

  updateName(name) {
    this.profileService.updateProfile({ name });
  }

  updateAlias(alias) {
    this.profileService.updateProfile({ alias });
  }

  updateEmail(email) {
    this.profileService.updateProfile({ email });
  }

  editPassword() {
    this.disablePass = false;
  }

  updatePassword(password) {
    // Figure out a way to clear password InputBox
    this.disablePass = true;
    this.profileService.updateProfile({ password });
  }

  /******************
   * Notifications
   */

  onSubscribe(subType: boolean) {
    if (subType) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.profileService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
    } else {
      this.swPush.unsubscribe()
      .then(sub => this.profileService.removePushSubscriber().subscribe())
      .catch(err => console.error('Could not unsubscribe from notifications', err));
    }
  }

  sendToServer(params: any) {
    console.log('params', params);
    this.http.post(`${environment.api_url}/notifications`, { notification : params }).subscribe();
  }

}
