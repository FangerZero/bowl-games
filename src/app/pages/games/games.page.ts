import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GamesService } from './games.service';
import { Game } from './game.model';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  loadedGames: Game[];

  constructor(private gamesService: GamesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedGames = this.gamesService.games;
  }

  onOpenGame(gameId: string) {
    this.modalCtrl
    .create({ component: GameComponent, componentProps: {game: this.loadedGames[gameId]}, id: 'gameModal' })
    .then(modalEl => {
      modalEl.present();
    });
  }

}
