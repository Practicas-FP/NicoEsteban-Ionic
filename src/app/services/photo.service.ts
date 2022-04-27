import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


//FIRESTORE:
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  userUID: string = "";
  public photoFromDB_SERVICE: string = "no_photo";

  constructor() {
    // Checking if user is loggued in:
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userUID = user.uid;
      }
    });
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format
    const base64Data = await this.readAsBase64(photo);

    //Saving in Firestore
    try {
      await setDoc(doc(db, "profile", this.userUID), {// + this.movieId
        user_uid: this.userUID,
        photo_base64: base64Data,
      });
    } catch (e) {
      console.error("[savePicture] -> Error adding document: ", e);
    }
  }

  async getPhotoFromDB() {
    //Obtaining user's whatchlist form Firestore:
    const q = query(collection(db, "profile"), where("user_uid", "==", this.userUID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.photoFromDB_SERVICE = doc.get("photo_base64");
    });
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
//!PhotoService


//Interface:
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
