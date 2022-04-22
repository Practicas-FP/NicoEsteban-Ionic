import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingMoviesPage } from './upcoming-movies.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingMoviesPageRoutingModule {}
