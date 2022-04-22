import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.page.html',
  styleUrls: ['./top-rated-movies.page.scss'],
})
export class TopRatedMoviesPage implements OnInit {

  listOfMovies!: Observable<any>;

  constructor(private movieSvc: ServiceService) { }

  ngOnInit() {
    this.getTopRatedMovies(1);
  }

  getTopRatedMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getTopRatedMovies(page);
  }

  saveToLocalStorage(movieId: any){
    localStorage.setItem("recommendedMoviesId", movieId);
  }
}