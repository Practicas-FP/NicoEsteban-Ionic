import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularMoviesPageRoutingModule } from './popular-movies-routing.module';

import { PopularMoviesPage } from './popular-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularMoviesPageRoutingModule
  ],
  declarations: [PopularMoviesPage]
})
export class PopularMoviesPageModule {}
