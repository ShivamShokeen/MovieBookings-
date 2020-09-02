import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatsPage } from './seats.page';

const routes: Routes = [
  {
    path: '',
    component: SeatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatsPageRoutingModule {}
