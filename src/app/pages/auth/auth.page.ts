import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private loadingCtrl: LoadingController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/games');
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    //console.log(email, password);
    if (this.isLogin) {
      form.reset();
      // Send Request to Login
    } else {
      // Send Request to Sign up
    }
  }

}
