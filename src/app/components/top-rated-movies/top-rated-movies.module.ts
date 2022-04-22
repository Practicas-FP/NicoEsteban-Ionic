import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopRatedMoviesPageRoutingModule } from './top-rated-movies-routing.module';
import { TopRatedMoviesPage } from './top-rated-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopRatedMoviesPageRoutingModule
  ],
  declarations: [TopRatedMoviesPage]
})
export class TopRatedMoviesPageModule {}

