import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.page.html',
  styleUrls: ['./upcoming-movies.page.scss'],
})
export class UpcomingMoviesPage implements OnInit {

  listOfMovies!: Observable<any>;

  constructor(private movieSvc: ServiceService) { }

  ngOnInit() {
    this.getUpcomingMovies(1);
  }

  getUpcomingMovies(page: number): void {
    this.listOfMovies = this.movieSvc.getUpcomingMovies(page);
  }
}
