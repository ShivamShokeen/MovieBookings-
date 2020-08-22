import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCredentialsPage } from './user-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: UserCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCredentialsPageRoutingModule {}
