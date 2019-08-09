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
    this.teamsService.teams.subscribe(teams => {
      this.loadedTeams = teams.sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onOpenTeam(teamId: number) {
    const loadedTeam = this.loadedTeams.find(team => team.id === teamId);
    this.modalCtrl
    .create({ component: TeamComponent, componentProps: { team: loadedTeam}, id: 'teamModal' })
    .then(modalEl => {
      modalEl.present();
    });
  }
}
