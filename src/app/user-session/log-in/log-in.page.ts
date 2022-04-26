import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

import { FormGroup, FormControl } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";

//Adding Google login
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const app = initializeApp(environment.firebaseConfig)

//Adding Google login
const provider = new GoogleAuthProvider();


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  loginForm = new FormGroup({
    user_email: new FormControl(""),
    user_password: new FormControl(""),
  });

  public error: boolean = false;
  public userIsLogged: boolean = false;
  public error_message: string = "";

  constructor(
    private router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  onLogin() {
    this.presentLoading();


    const user_email = this.loginForm.controls["user_email"].value;
    const user_password = this.loginForm.controls["user_password"].value;
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!user_email.match(regex)) {
      this.error = true;
      this.error_message = "Debes introducir un correo electrónico válido."
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    if (user_email.length == 0 || user_password.length == 0) {
      this.error = true;
      this.error_message = "Intruduce tu correo electrónico y tu contraseña."
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    if (this.error == false) {
      const auth = getAuth();

      //SignIn function
      signInWithEmailAndPassword(auth, user_email, user_password)
        .then((userCredential) => {
          const user = userCredential;
          this.userIsLogged = true;

          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
            }
          })
          this.router.navigate(["/"]);
        })
        .catch((error) => {
          this.error = true;
          if (error.code == "auth/wrong-password") {
            this.error_message = "La contraseña introducida es incorrecta.";
            setTimeout(() => {
              window.location.reload();
            }, 2500);

          } else if (error.code == "auth/user-not-found") {
            this.error_message = "No existe ningún usuario con este correo electrónico.";
            setTimeout(() => {
              window.location.reload();
            }, 2500);

          }
        });
    }
  }
  //!OnLogin

  onLoginGoogle(){
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Redirect to Home
        this.router.navigate(["/"]);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Logging in...',
      duration: 500
    });
   return await loading.present();
    //const { role, data } = await loading.onDidDismiss();
   }

}
