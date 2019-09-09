import { Component, OnInit } from '@angular/core';

import { Selection } from './selection-data.model';
import { SelectionsService } from './selections.service';
import { Bowl } from '../games/bowl.model';
import { Profile } from '../profile/profile-data.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.page.html',
  styleUrls: ['./selections.page.scss'],
})
export class SelectionsPage implements OnInit {
  loadedSelections: Selection[];
  loadedGames: Bowl[];
  loadedProfile: Profile;

  constructor(
    private selectionsService: SelectionsService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.selectionsService.selections.subscribe(selections => {
      this.loadedSelections = selections;
    });
    this.selectionsService.games.subscribe(games => {
      this.loadedGames = games;
    });
    this.profileService.profile.subscribe(profile => {
      this.loadedProfile = profile;
    });
  }

  getDisabled(date: Date) {
    return date !== null && new Date(date) < new Date();
  }

  getSelectedTeamId(gameId: number, teamId: number) {
    const selectedGame = this.loadedSelections.find(select => gameId === select.gameId);
    if (!!selectedGame && selectedGame.teamId === teamId) {
      return true;
    }
    return false;
  }

  onSelectTeam(e, gameId: number) {
    const gameSelection = { teamId: +e.detail.value, gameId};
    const selectedGame = this.loadedSelections.find(select => gameId === select.gameId);

    if (this.loadedSelections.length) {
      this.selectionsService.updateSelection(gameSelection);
    } else {
      this.loadedSelections.push({ id: 0, gameId, userId: 0, teamId: +e.detail.value });
      this.selectionsService.createSelection(gameSelection);
    }
  }

  onPay() {
    // Place Holder
    this.profileService.updateProfile({ paid: true });
  }

}
