import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { UserCredentialsService } from './services/user-credentials.service';
import { Router } from '@angular/router';
import { MovieCredentialsService } from './services/movie-credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userCredential : UserCredentialsService,
    public movieCredential : MovieCredentialsService,
    private router:Router,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebaseConfig);
  }

  userLogout() {
    firebase.auth().signOut().then(() => {
      console.log("Sign-out successful.");
      this.userCredential.userName = "";
      this.userCredential.businessUserUID = "";
      this.userCredential.UID = "";
      this.logoutMessage();
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You are successfully signout.',
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }

}
