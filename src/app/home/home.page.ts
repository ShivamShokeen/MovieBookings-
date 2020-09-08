import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { UserCredentialsService } from '../services/user-credentials.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  searchInput: string;
  moviesDetails: any;
  constructor(public movieCredentials: MovieCredentialsService, public toastController: ToastController, public userCredentials: UserCredentialsService, private router: Router,) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.waitingMessage();
    let filterCondition: any;
    let reference: any;
    let duplicateData = [];
    let removeDup: any;
    reference = firebase.database().ref('/addMovies').on("value", (snapshot) => {
      let index: string;
      for (index in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(index)) {
          filterCondition = { ...snapshot.val()[index], id: index };
          if (filterCondition.images) {
            duplicateData.push(filterCondition);
            removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            this.movieCredentials.moviesList = removeDup;
            this.filterSearch();
          }
        }
      }
    });
  }

  filterSearch() {
    if (this.movieCredentials.moviesList != undefined) {
      this.moviesDetails = this.movieCredentials.filterRecords(this.searchInput);
    }
  }

  async pageRefreshedMessage() {
    const toast = await this.toastController.create({
      message: "Refreshed.",
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

  async waitingMessage() {
    const toast = await this.toastController.create({
      message: "Please wait for few seconds :).",
      duration: 2000,
      color: "primary",
      position: "middle",
    });
    toast.present();
  }
}
