import { Component, OnInit } from '@angular/core';

import { Selection } from './selection-data.model';
import { SelectionsService } from './selections.service';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.page.html',
  styleUrls: ['./selections.page.scss'],
})
export class SelectionsPage implements OnInit {
  loadedSelections: Selection[];

  constructor(
    private selectionsService: SelectionsService
  ) { }

  ngOnInit() {
    this.selectionsService.selections.subscribe(selections => {
      this.loadedSelections = selections;
    });
  }

}
