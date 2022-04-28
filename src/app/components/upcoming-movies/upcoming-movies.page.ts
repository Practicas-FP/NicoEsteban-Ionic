import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.page.html',
  styleUrls: ['./upcoming-movies.page.scss'],
})
export class UpcomingMoviesPage implements OnInit {

  listOfMovies!: Observable<any>;
  //Pagination
  p: number = 1;

  
  constructor(
    private movieSvc: ServiceService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.getUpcomingMovies(1);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading movies...',
      duration: 500
    });
    return await loading.present();
    //const { role, data } = await loading.onDidDismiss();
  }

  getUpcomingMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getUpcomingMovies(page);
  }

  saveToLocalStorage(movieId: any) {
    localStorage.setItem("recommendedMoviesId", movieId);
  }



}

