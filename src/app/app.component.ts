import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './pages/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn = false;
  isAdmin = false;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private swUpdate: SwUpdate,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.loggedIn = isAuthenticated;
    });
    this.adminListenerSubs = this.authService.getAdminStatusListener().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    // Updating something
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe({next: () => {
        if (confirm('New version available, Load New Version?')) {
          window.location.reload();
        }
      }});
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loggedIn = !!this.authService.token;
    });
  }

  onLogout() {
    this.loggedIn = false;
    this.isAdmin = false;
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
