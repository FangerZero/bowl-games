import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(private teamService: TeamsService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.teamName;
    const mascot = form.value.teamMascot;
    const city = form.value.teamCity;
    const state = form.value.teamState;
    const rank = form.value.teamRank;
    this.teamService.createTeam(name, mascot, city, state, rank);
    form.reset();


  }

}
