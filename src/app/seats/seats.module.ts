import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatsPageRoutingModule } from './seats-routing.module';

import { SeatsPage } from './seats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatsPageRoutingModule
  ],
  declarations: [SeatsPage]
})
export class SeatsPageModule {}
