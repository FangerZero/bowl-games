import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { GamesService } from './games.service';
import { Game } from './game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  loadedGames: Game[];

  constructor(private gamesService: GamesService, private router: Router) { }

  ngOnInit() {
    this.gamesService.games.subscribe(games => {
      this.loadedGames = games.sort((a,b) => {
        if(a.date < b.date) { return -1; }
        if(a.date > b.date) { return 1; }
        return 0;
      });
    });
  }

  onEditGame(gameId: number) {
    this.router.navigateByUrl(`admin/games/edit/${gameId}`);
  }

}
