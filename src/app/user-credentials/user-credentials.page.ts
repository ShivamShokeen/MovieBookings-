import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCredentialsService } from '../services/user-credentials.service';
import { NgForm } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

import * as firebase from 'firebase';
import { WindowService } from '../services/window.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.page.html',
  styleUrls: ['./user-credentials.page.scss'],
})
export class UserCredentialsPage implements OnInit, AfterViewInit {

  paramRequestType: string;
  userDetails = {
    name: "",
    country: "",
    city: "",
    email: "",
    password: "",
    address: "",
    uid: ""
  };

  showRegistrationForm = false;
  error = null;
  clearErrorMessage = true;
  phone = {
    phoneNumber: "",
    phoneVerification: ""
  }
  windowRef: any;
  appVerifier: any;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private router: Router, private route: ActivatedRoute, public userCredentials: UserCredentialsService, private toastController: ToastController, private windowService: WindowService, private http: HttpClient, public alertController: AlertController) {
    this.paramRequestType = this.route.snapshot.params['for'];
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;
  }

  ngAfterViewInit() {
    //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    //     size: 'normal',
    //     callback: (response) => {

    //     }
    //   });
    //   this.windowRef.recaptchaVerifier.render();

  }

  // PhoneNumberVerifications(form) {
  //   if (form.valid) {
  //     const phoneNumber = form.value.phoneNumber.toString();
  //     if (phoneNumber.length == 10) {
  //       // const appVerifier = this.recaptchaVerifier;
  //       const phoneNumberString = "+91" + phoneNumber;
  //       console.log(phoneNumberString);
  //       var provider = new firebase.auth.PhoneAuthProvider();
  //       provider.verifyPhoneNumber(phoneNumberString, this.windowRef.recaptchaVerifier)
  //         .then((verificationId) => {
  //           // SMS sent. Prompt user to type the code from the message, then sign the
  //           // user in with confirmationResult.confirm(code).
  //           var verificationCode = window.prompt('Please enter the verification ' +
  //             'code that was sent to your mobile device.');
  //           console.log(verificationCode)
  //           let details;
  //           details= firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);            
  //         return firebase.auth().signInWithCredential(details);
  //         })
  //         .catch(error => {
  //           this.smsErrorMessage(error.message)
  //           console.error("SMS not sent", error);
  //         })
  //     }
  //     else {
  //       this.phoneErrorMessage();
  //     }
  //   }
  // }
  onSignUp(form: NgForm) {
    if (form.valid) {
      console.log(form);
      console.log(form.value);
      firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.passwords)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.userDetails.name
              });
            }
            console.log(userLogginDetails.uid);
            this.userDetails.uid = userLogginDetails.uid;
            this.http.post('https://moviebooking-35404.firebaseio.com/userAccounts.json', this.userDetails).subscribe(responseData => {
              console.log("User signup successfully");
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })

      this.signupSuccessMessage();
      this.router.navigate(['/user-credentials/signin']);
    }
  }

  userLogin(emailId, password) {
    if (emailId.value != undefined || emailId.value != "" && password.value != undefined || password.value != "") {
      this.waitMessage();
      firebase.auth().signInWithEmailAndPassword(emailId.value, password.value)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            this.userCredentials.UID = userLogginDetails.uid;
            this.userCredentials.getLogginUserDetails();
            this.router.navigate(['/home']);
          })
        .catch(error => {
          console.log(error);
          console.log(error.message);
          this.signupErrorMessage(error.message);
        })
    }
    else {
      this.emptyFieldAlert();
    }
  }
  resetErrorMessage() {
    this.clearErrorMessage = false;
    console.log("reseted");
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter all the detail's before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async signupSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Transfering to Signin/Login :)',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  async waitMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few seconds :) .',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async phoneErrorMessage() {
    const toast = await this.toastController.create({
      message: 'Phone number should be of 10 digits.',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async smsErrorMessage(messages) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

  async signupErrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }
}
