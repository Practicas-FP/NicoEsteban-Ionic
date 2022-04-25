import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.page.html',
  styleUrls: ['./popular-movies.page.scss'],
})
export class PopularMoviesPage implements OnInit {

  listOfMovies!: Observable<any>;
  
  constructor(
    private movieSvc: ServiceService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.getPopularMovies(1);
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

  getPopularMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getPopularMovies(page);
  }

  saveToLocalStorage(movieId: any){
    localStorage.setItem("recommendedMoviesId", movieId);
  }

}
