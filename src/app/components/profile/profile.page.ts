import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhotoService } from 'src/app/services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { LoadingController } from '@ionic/angular';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
const app = initializeApp(environment.firebaseConfig);


// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

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

  isGoogleUser: boolean = false;
  hasPhoto: boolean = false;

  userPhotoFromDB_PROFILE: string;

  constructor(
    public photoService: PhotoService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();

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

      //Checking if is a Google user
      if (this.userPhotoURL != null) {
        this.isGoogleUser = true;
      }

      //Getting user photo from DB
      this.photoService.getPhotoFromDB();
      setTimeout(() => {
        this.userPhotoFromDB_PROFILE = this.photoService.photoFromDB_SERVICE;
        if (this.userPhotoFromDB_PROFILE != "no_photo") {
          this.hasPhoto = true;
        }
      }, 1500);
    })
  }
  //!OnInit

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading Profile...',
      duration: 500
    });
    return await loading.present();
    //const { role, data } = await loading.onDidDismiss();
  }

  changePhoto() {
    this.photoService.addNewToGallery();
  }

  doRefresh(event) {
    window.location.reload();
  }

}
