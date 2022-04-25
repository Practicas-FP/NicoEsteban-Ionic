
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listOfMovies!: Observable<any>;
  recommendedMoviesId: any = localStorage.getItem("recommendedMoviesId");
  hideTitle: boolean = false;
  hideResultsFor: boolean = true;
  movieSearched: string = "";

  constructor(private movieSvc: ServiceService) { }

  ngOnInit() {
    if (this.recommendedMoviesId != null) {
      this.listOfMovies = this.movieSvc.getRelatedMovies(this.recommendedMoviesId);
    }
    if (this.recommendedMoviesId == null) {
      this.listOfMovies = this.movieSvc.getRelatedMovies(603);
    }
  }


  searchMovie(event) {
    const input = event.target.value;

    if (input != '') {
      this.listOfMovies = this.movieSvc.searchMovies(input.trim(), 1);
      this.movieSearched = input.trim();
      this.hideResultsFor = false;
      this.hideTitle = true;
    }

    if (input == '') {
      this.listOfMovies = this.movieSvc.getRelatedMovies(this.recommendedMoviesId);
      this.hideResultsFor = true;
      this.hideTitle = false;
    }
  }

  saveToLocalStorage(movieId: any) {
    localStorage.setItem("recommendedMoviesId", movieId);
  }
}

