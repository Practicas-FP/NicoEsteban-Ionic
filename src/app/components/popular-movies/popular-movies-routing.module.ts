import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularMoviesPage } from './popular-movies.page';

const routes: Routes = [
  {
    path: '',
    component: PopularMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularMoviesPageRoutingModule {}
