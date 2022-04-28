import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//Adding Google login
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);

//Adding Google login
const provider = new GoogleAuthProvider();

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})


export class SignInPage implements OnInit {

  registerForm = new FormGroup({
    user_email: new FormControl(""),
    user_password: new FormControl(""),
    user_password_confirmation: new FormControl("")
  });

  public error: boolean = false;
  public success: boolean = false;
  public error_message: string = "";
  public success_message: string = "";


  constructor(private router: Router) { }


  ngOnInit(): void { }


  onRegister() {

    this.error = false;
    //this.ok = false;

    const user_email = this.registerForm.controls["user_email"].value;
    const user_password = this.registerForm.controls["user_password"].value;
    const user_password_confirmation = this.registerForm.controls["user_password_confirmation"].value;
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!user_email.match(regex)) {
      this.error = true;
      this.error_message = "Introduce un correo electrónico válido."
      /*
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      */
    }

    if (user_password.length < 6) {
      this.error = true;
      this.error_message = "La contraseña debe tener al menos 6 caracteres."
    }

    if (user_password != user_password_confirmation) {
      this.error = true;
      this.error_message = "Las contraseñas introducidas no coinciden."
    }

    if (this.error == false) {
      //this.ok = true;
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, user_email, user_password)
        .then((userCredential) => {
          const user = userCredential;

          /*signInWithEmailAndPassword(auth, user_email, user_password)
            .then((userCredential) => {
              const user = userCredential;
 
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  const uid = user.uid;
                }
              })
            })*/
          this.success = true;
          this.success_message = "Cuenta creada correctamente."
          setTimeout(() => {
            //this.router.navigate(["/log-in"]);
            this.router.navigate(["/"]);
          }, 2500);

        }).catch((error) => {
          this.error = true
          if (error.code == "auth/email-already-in-use") {
            this.error_message = "Este usuario ya existe.";
          }
        });
    }
  }
  // onRegister

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
}
