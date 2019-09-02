import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BowlsService } from './bowls.service';
import { Bowl } from './bowl.model';

@Component({
  selector: 'app-bowls',
  templateUrl: './bowls.page.html',
  styleUrls: ['./bowls.page.scss'],
})
export class BowlsPage implements OnInit {
  loadedBowls: Bowl[];

  constructor(private bowlsService: BowlsService, private router: Router) { }

  ngOnInit() {
    this.bowlsService.bowls.subscribe(bowls => {
      this.loadedBowls = bowls.sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    });
  }

  onEditBowl(bowlId: number) {
    this.router.navigateByUrl(`admin/bowls/edit/${bowlId}`);
  }

}
