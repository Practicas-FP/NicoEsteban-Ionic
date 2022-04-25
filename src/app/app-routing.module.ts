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
  },
  {
    path: 'top-rated-movies',
    loadChildren: () => import('./components/top-rated-movies/top-rated-movies.module').then( m => m.TopRatedMoviesPageModule)
  },
  {
    path: 'popular-movies',
    loadChildren: () => import('./components/popular-movies/popular-movies.module').then( m => m.PopularMoviesPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./user-session/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./user-session/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./components/watchlist/watchlist.module').then( m => m.WatchlistPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
