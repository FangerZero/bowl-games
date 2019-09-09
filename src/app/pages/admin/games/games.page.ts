import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { BowlsService } from '../bowls/bowls.service';
import { Bowl } from '../bowls/bowl.model';
import { TeamsService } from '../../teams/teams.service';
import { Team } from '../../teams/team.model';
import { GamesService } from './games.service';
import { Game } from './game.model';


@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  loadedGames: Game[];
  loadedTeams: Team[];
  loadedBowls: Bowl[];

  constructor(
    private gamesService: GamesService,
    private teamsService: TeamsService,
    private bowlsService: BowlsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gamesService.games.subscribe(games => {
      this.loadedGames = games.sort((a, b) => {
        if (a.date < b.date) { return -1; }
        if (a.date > b.date) { return 1; }
        return 0;
      });
    });

    this.teamsService.teams.subscribe(teams => {
      this.loadedTeams = teams.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    });

    this.bowlsService.bowls.subscribe(bowls => {
      this.loadedBowls = bowls.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onEditGame(gameId: number) {
    this.router.navigateByUrl(`admin/games/edit/${gameId}`);
  }

  getBowlName(bowlId: number) {
    if (this.loadedBowls) {
      return this.loadedBowls.find(element => element.id === bowlId).name;
    }
  }

  getTeamName(teamId: number) {
    if (this.loadedTeams) {
      return this.loadedTeams.find(element => element.id === teamId).name;
    }
  }
}
