import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCredentialsPageRoutingModule } from './user-credentials-routing.module';

import { UserCredentialsPage } from './user-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCredentialsPageRoutingModule
  ],
  declarations: [UserCredentialsPage]
})
export class UserCredentialsPageModule {}
