import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditMoviePage } from './add-edit-movie.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditMoviePageRoutingModule {}
