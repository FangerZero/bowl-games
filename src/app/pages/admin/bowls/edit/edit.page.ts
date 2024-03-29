import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { BowlsService } from '../bowls.service';
import { Bowl } from '../bowl.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  loadedBowl: Bowl;
  id: number;

  constructor(private bowlsService: BowlsService, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });

    this.bowlsService.getBowl(this.id).subscribe(bowl => {
      this.loadedBowl = bowl;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.bowlName;
    this.bowlsService.updateBowl(this.id, name);
  }

  async onDelete() {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: `Are you sure you want to delete <strong>${this.loadedBowl.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'DELETE',
          handler: () => {
            this.bowlsService.deleteBowl(this.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
