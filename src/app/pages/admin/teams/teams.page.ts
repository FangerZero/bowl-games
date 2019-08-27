import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { TeamsService } from './teams.service';
import { Team } from './team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  loadedTeams: Team[];
  private placeSub: Subscription;

  constructor(private teamsService: TeamsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamsService.teams.subscribe(teams => {
      this.loadedTeams = teams.sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onEditTeam(teamId: number) {
    this.router.navigateByUrl(`admin/teams/edit/${teamId}`);
  }

}
