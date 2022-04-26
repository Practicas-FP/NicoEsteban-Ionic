import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
const app = initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userUID: string = "";
  userPhotoURL: string = "";
  userDisplayName: string = "";
  userEmail: string = "";
  userCreatedAt: string = "";

  constructor() { }

  ngOnInit() {

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userUID = user.uid;
        this.userPhotoURL = user.photoURL;
        this.userDisplayName = user.displayName;
        this.userEmail = user.email;
        this.userCreatedAt = user.metadata.creationTime;
      } else {
        this.userUID = "";
      }
    })
  }


}
