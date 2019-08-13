import { Component, OnInit } from '@angular/core';

import { Selection } from './selection-data.model';
import { SelectionsService } from './selections.service';
import { Game } from '../games/game.model';
import { Bowl } from '../../components/bowls/bowl.model';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.page.html',
  styleUrls: ['./selections.page.scss'],
})
export class SelectionsPage implements OnInit {
  loadedSelections: Selection[];
  loadedGames: Bowl[];

  constructor(
    private selectionsService: SelectionsService
  ) { }

  ngOnInit() {
    this.selectionsService.selections.subscribe(selections => {
      console.log('selections:', selections);
      this.loadedSelections = selections;
    });
    this.selectionsService.games.subscribe(games => {
      console.log('games:', games);
      this.loadedGames = games;
    });
  }

  onSelectTeam(value, gameId) {
    console.log('gameId:', gameId);
    console.log('value:', value.detail.value);
    this.selectionsService.updateSelection();
  }

}
