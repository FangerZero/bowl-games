import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { TeamsService } from '../teams.service';
import { Team } from '../team.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  loadedTeam: Team;
  id: number;

  constructor(private teamsService: TeamsService, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });

    this.teamsService.getTeam(this.id).subscribe(team => {
      this.loadedTeam = team;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.teamName;
    const mascot = form.value.teamMascot;
    const city = form.value.teamCity;
    const state = form.value.teamState;
    const rank = form.value.teamRank;
    this.teamsService.updateTeam(this.id, name, mascot, city, state, rank);
  }

  async onDelete() {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: `Are you sure you want to delete <strong>${this.loadedTeam.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'DELETE',
          cssClass: 'danger',
          handler: () => {
            this.teamsService.deleteTeam(this.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
