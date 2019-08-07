import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { TeamsService } from './teams.service';
import { Team } from './team.model';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  loadedTeams: Team[];

  constructor(private teamsService: TeamsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedTeams = this.teamsService.teams;
  }

  onOpenTeam(teamId: string) {
    this.modalCtrl
    .create({ component: TeamComponent, componentProps: { team: this.loadedTeams[teamId]}, id: 'teamModal' })
    .then(modalEl => {
      modalEl.present();
    });
  }
}
