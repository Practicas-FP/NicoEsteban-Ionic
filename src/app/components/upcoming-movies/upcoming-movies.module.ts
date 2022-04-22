import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingMoviesPageRoutingModule } from './upcoming-movies-routing.module';

import { UpcomingMoviesPage } from './upcoming-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingMoviesPageRoutingModule
  ],
  declarations: [UpcomingMoviesPage]
})
export class UpcomingMoviesPageModule {}
