import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/app/interfaces/imovie';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { addDoc, deleteField, doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";


//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {

  movie!: IMovie;
  watchlist: any[] = [];
  userUID: string = "";
  movieDeleted: boolean = false;
  movieDeletedTitle: string = "";

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit(): void {
    this.presentLoading();

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userUID = user.uid;
        this.getUsersWatchlist();
      } else {
        this.userUID = "";
      }
    })
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


  doRefresh(event) {
    //Removing current movies in Watchlist Array
    for (let i = this.watchlist.length; i > 0; i--) {
      this.watchlist.pop();
     }
    this.getUsersWatchlist();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


  async getUsersWatchlist() {
    //Obtaining user's whatchlist form Firestore:
    const q = query(collection(db, "watchlist"), where("user_uid", "==", this.userUID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.movie = {
        id: doc.get("movie_id"),
        title: doc.get("movie_title"),
        poster_path: doc.get("movie_poster_path"),
        backdrop_path: doc.get("movie_poster_path"),
        release_date: doc.get("movie_release_date"),
        vote_average: doc.get("movie_vote_average"),
        vote_count: doc.get("movie_vote_count"),
        original_language: "",
        overview: "",
        runtime: "",
        genres: "",
      }
      this.watchlist.push(this.movie)
    });
  }

  async delete(movieId: any) {
    try {
      await deleteDoc(doc(db, "watchlist", this.userUID + movieId));
      this.movieDeleted = true;

      //Toast
      const toast = await this.toastController.create({
        message: "Removed from your Watchlist",
        duration: 1500,
        translucent: true,
        animated: true,
        position: "bottom",
        cssClass: 'toast-custom-class'
      });
      toast.present();
     
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (e) {
      console.error("[delete()] -> Error al borrar película: ", e);
    }
  }
}


