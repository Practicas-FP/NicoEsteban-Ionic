import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { IMovie } from 'src/app/interfaces/imovie';

import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})

export class MovieDetailsPage implements OnInit {

  movieId: any;
  movie: Observable<IMovie>; //any
  listOfRelatedMovies!: Observable<any>;

  userUID: string = "";
  userIsLoggued!: boolean;

  inWatchlist: boolean = false;

  //Movie info from DB:
  _title!: string;
  _poster_path !: string;
  _release_date!: string;
  _vote_average!: string;
  _vote_count!: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieSvc: ServiceService,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
    //Id of the movie:
    this.movieId = this.activatedRoute.snapshot.paramMap.get("id");
    //Movie data from Service
    this.movie = this.movieSvc.getMovieDetails(this.movieId);
    //Related movies from Service
    this.getRelatedMovies();
    this.getMovieData();
   
    // Checking if user is loggued in:
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userIsLoggued = true;
        this.userUID = user.uid;
      } else {
        this.userIsLoggued = false;
      }
    });


  }  //--OnInit


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading movie details...',
      duration: 500
    });
   return await loading.present();
    //const { role, data } = await loading.onDidDismiss();
   }

  getRelatedMovies() {
    this.listOfRelatedMovies = this.movieSvc.getRelatedMovies(this.movieId);
  }

  getMovieData() {
    const url = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=572f6e73385919e6eb3a365a3e144cce&language=en-EN`;

    this.http.get<IMovie>(url)
      .subscribe((response) => {
        this._title = response.title;
        this._poster_path = response.poster_path;
        this._release_date = response.release_date;
        this._vote_average = response.vote_average;
        this._vote_count = response.vote_count;
        console.log("[getMovieData] -> datos de la peli obtenidos");
      }, err => {
        console.log("[getMovieData] -> Error al obtener los datos de la peli:" + err);
      })
  }

  async addToWatchlist() {
    if (this.userIsLoggued == true) {
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

        this.inWatchlist = true;
    
        //Toast
        const toast = await this.toastController.create({
          message: "Added to your Watchlist",
          duration: 2000,
          translucent: true,
          animated: true,
          position: "bottom"
        });
        toast.present();

      } catch (e) {
        console.error("[addToWatchlist] -> Error adding document: ", e);
      }
      //this.showAddButton = false;
      //this.showAddedButton = true;
      //this.showSuccessMessaje = true;
    }

    if (this.userIsLoggued == false) {

      //Alert
      const alert = await this.alertController.create({
        header: "Watchlist",
        message: "Log-in or Sign-in to add this movie to your Watchlist",
        buttons: [
          {
            text: "Log-In",
            handler: () => {
              this.router.navigate(["/log-in"]);
            }
          },
          {
            text: "Sign-In",
            handler: () => {
              this.router.navigate(["/sign-in"]);
            }
          }
        ]
      });
      await alert.present()
      let result = await alert.onDidDismiss();
    }


  }

  saveToLocalStorage(movieId: any) {
    localStorage.setItem("recommendedMoviesId", movieId);
  }

}
