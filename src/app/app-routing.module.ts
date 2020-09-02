import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user-credentials/:for',
    loadChildren: () => import('./user-credentials/user-credentials.module').then( m => m.UserCredentialsPageModule)
  },
  {
    path: 'business-signup',
    loadChildren: () => import('./user-credentials/business-signup/business-signup.module').then( m => m.BusinessSignupPageModule)
  },
  {
    path: 'add-edit-movie/:for',
    loadChildren: () => import('./add-edit-movie/add-edit-movie.module').then( m => m.AddEditMoviePageModule)
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('./home/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  },
  {
    path: 'shoppingcart',
    loadChildren: () => import('./shoppingcart/shoppingcart.module').then( m => m.ShoppingcartPageModule)
  },
  {
    path: 'edit-movie/:id',
    loadChildren: () => import('./edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
  },  {
    path: 'seats',
    loadChildren: () => import('./seats/seats.module').then( m => m.SeatsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
