import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movieId: any;
  movie: Observable<any>;
  listOfRelatedMovies!: Observable<any>;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private movieSvc: ServiceService
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

}
