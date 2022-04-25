import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from "firebase/app";


//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Upcoming movies', url: '/upcoming-movies', icon: 'film' },
    { title: 'Popular movies', url: '/popular-movies', icon: 'film' },
    { title: 'Top rated movies', url: '/top-rated-movies', icon: 'film' },
    { title: 'Log-In', url: '/log-in', icon: 'log-in' },
    { title: 'Sign-In', url: '/sign-in', icon: 'create' }
  ];

  userIsLoggued!: boolean;
  userUID: string = "";

  constructor() { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userIsLoggued = true;
        this.userUID = user.uid;
      } else {
        this.userIsLoggued = false;
      }
    })
  }


  onLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.userIsLoggued = false;
    });
  }
}
