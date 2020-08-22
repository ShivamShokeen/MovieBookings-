import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMoviePageRoutingModule } from './edit-movie-routing.module';

import { EditMoviePage } from './edit-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMoviePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditMoviePage]
})
export class EditMoviePageModule {}
