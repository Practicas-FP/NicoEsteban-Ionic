import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movieId: any;
  movie: Observable<any>;
  listOfRelatedMovies!: Observable<any>;

  userUID: string = "";
  userIsLoggued!: boolean;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private movieSvc: ServiceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    //Id of the movie:
    this.movieId = this.activatedRoute.snapshot.paramMap.get("id");
    
    //Movie data from Service
    this.movie = this.movieSvc.getMovieDetails(this.movieId);

    //Related movies frmo Service
    this.getRelatedMovies();

  }

  getRelatedMovies() {
    this.listOfRelatedMovies = this.movieSvc.getRelatedMovies(this.movieId);
  }

  async addToWatchlist() {

    
    
    /*if (this.userIsLoggued == true) {
      //Saving in Firestore
      try {
        await setDoc(doc(db, "watchlist", this.userUID + this.movieId), {
          user_uid: this.userUID,
          movie_id: this.movieId,
          movie_title: this._title,
          movie_poster_path: this._poster_path,
          movie_release_date: this._release_date,
          movie_vote_average: this._vote_average,
          movie_vote_count: this._vote_count,
        });

      } catch (e) {
        console.error("[addToWatchlist] -> Error adding document: ", e);
      }
      this.showAddButton = false;
      this.showAddedButton = true;
      this.showSuccessMessaje = true;
    }
    if (this.userIsLoggued == false) {
      this.showErrorMessaje = true;
    }*/

    //Toast
    const toast = await this.toastController.create({
      message: "Added to your Watchlist",
      duration: 1000,
      position: "bottom"
    });

    toast.present();
  }

  saveToLocalStorage(movieId: any){
    localStorage.setItem("recommendedMoviesId", movieId);
  }

}
