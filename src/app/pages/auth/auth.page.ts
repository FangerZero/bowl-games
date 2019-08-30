import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {
  isLoading = false;
  isLogin = true;
  isAuthenticated = true;
  private authListenerSubs: Subscription;

  constructor(private loadingCtrl: LoadingController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onSwitchAuthMode() {
    this.isAuthenticated = true;
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLogin) {
      // Send Request to Login
      this.isAuthenticated = false;
      this.authService.login(email, password);
      form.reset();
    } else {
      const name = form.value.name;
      const alias = form.value.alias || '';
      // Send Request to Sign up
      // On create user, logs you in and take you to the selections page
      this.authService.createUser(email, password, name, alias);
    }
  }

}
