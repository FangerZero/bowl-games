import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GamesService } from './games.service';
import { Game } from './game.model';
import { BowlGame } from './bowlGame.model';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  loadedGames: BowlGame[];

  constructor(private gamesService: GamesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.gamesService.games.subscribe(games => {
      this.loadedGames = games;
    });
  }

  onOpenGame(gameId: number) {
    const loadedGame = this.loadedGames.find(game => game.bowlId === gameId);
    this.modalCtrl
    .create({ component: GameComponent, componentProps: { game: loadedGame}, id: 'gameModal' })
    .then(modalEl => {
      modalEl.present();
    });
  }

}
