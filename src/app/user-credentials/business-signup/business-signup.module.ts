import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessSignupPageRoutingModule } from './business-signup-routing.module';

import { BusinessSignupPage } from './business-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessSignupPageRoutingModule
  ],
  declarations: [BusinessSignupPage]
})
export class BusinessSignupPageModule {}
