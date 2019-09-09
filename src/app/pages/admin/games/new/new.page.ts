import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BowlsService } from '../../bowls/bowls.service';
import { Bowl } from '../../bowls/bowl.model';
import { TeamsService } from '../../teams/teams.service';
import { Team } from '../../teams/team.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  loadedBowls: Bowl[];
  loadedTeams: Team[];
  dateStart: string;
  dateEnd: string;

  constructor(private bowlsService: BowlsService, private teamsService: TeamsService, private gamesService: GamesService) { }

  ngOnInit() {
    const year = new Date().getFullYear();
    this.dateStart = `${year}-12-15T10:00:00.000Z`;
    this.dateEnd = `${year + 1}-01-15T23:00:00.000Z`;

    this.bowlsService.bowls.subscribe(bowls => {
      this.loadedBowls = bowls.sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    });
    this.teamsService.teams.subscribe(teams => {
      this.loadedTeams = teams.sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const bowlId = form.value.gameBowl;
    const team1Id = form.value.gameTeam1;
    const team2Id = form.value.gameTeam2;
    const teamScore1 = form.value.gameScore1;
    const teamScore2 = form.value.gameScore2;
    const date = new Date(form.value.gameDate.split('T')[0] + 'T' + form.value.gameTime.split('T')[1]);
    const channel = form.value.gameChannel;
    const points = form.value.gamePoints;

    this.gamesService.createGame(bowlId, team1Id, team2Id, teamScore1, teamScore2, date, channel, points);
    form.reset();
  }
}
