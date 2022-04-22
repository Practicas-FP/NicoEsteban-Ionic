import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.page.html',
  styleUrls: ['./popular-movies.page.scss'],
})
export class PopularMoviesPage implements OnInit {

  listOfMovies!: Observable<any>;

  constructor(private movieSvc: ServiceService) { }

  ngOnInit() {
    this.getPopularMovies(1);
  }

  getPopularMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getPopularMovies(page);
  }

  saveToLocalStorage(movieId: any){
    localStorage.setItem("recommendedMoviesId", movieId);
  }

}
