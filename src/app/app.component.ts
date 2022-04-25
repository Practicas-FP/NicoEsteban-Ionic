import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Upcoming movies', url: '/upcoming-movies', icon: 'film' },
    { title: 'Popular movies', url: '/popular-movies', icon: 'film' },
    { title: 'Top rated movies', url: '/top-rated-movies', icon: 'film' },
    { title: 'Log-In', url: '/log-in', icon: 'log-in' },
    { title: 'Sign-In', url: '/sign-in', icon: 'create' }
  ];

  constructor() {}
}
