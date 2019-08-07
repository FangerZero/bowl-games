import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Team } from '../team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() team: Team;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClose() {
    this.modalCtrl.dismiss(null, 'close', 'teamModal');
  }

}
