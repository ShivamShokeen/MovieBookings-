import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditMoviePageRoutingModule } from './add-edit-movie-routing.module';

import { AddEditMoviePage } from './add-edit-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditMoviePageRoutingModule
  ],
  declarations: [AddEditMoviePage]
})
export class AddEditMoviePageModule {}
