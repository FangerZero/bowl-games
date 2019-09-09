import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(public alertController: AlertController, private supportService: SupportService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const subject = form.value.subject;
    const comment = form.value.comment;
    this.supportService.sendEmail({email, subject, comment});

    form.reset();
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank you!',
      subHeader: 'Your email has been sent to our admin.',
      message: 'We will get back to you as soon as possible.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
