import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'upcoming-movies',
    loadChildren: () => import('./components/upcoming-movies/upcoming-movies.module').then( m => m.UpcomingMoviesPageModule)
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('./components/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
