import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RanksPage } from './ranks.page';
import { RankPipe } from 'src/app/pipes/rank.pipe';

const routes: Routes = [
  {
    path: '',
    component: RanksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RanksPage, RankPipe]
})
export class RanksPageModule {}
