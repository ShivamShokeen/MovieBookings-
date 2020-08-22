import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessSignupPage } from './business-signup.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessSignupPageRoutingModule {}
