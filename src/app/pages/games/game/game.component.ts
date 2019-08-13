import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Game } from '../game.model';
import { BowlGame } from '../bowlGame.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game: BowlGame;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClose() {
    this.modalCtrl.dismiss(null, 'close', 'gameModal');
  }

}
