import { Component, OnInit } from '@angular/core';

import { RanksService } from './ranks.service';
import { Rank } from './rank.model';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
})
export class RanksPage implements OnInit {
  loadedRanks: Rank[];

  constructor( private rankService: RanksService) { }

  ngOnInit() {
    this.rankService.ranks.subscribe(ranks => {
      this.loadedRanks = ranks;
    });
  }

}
