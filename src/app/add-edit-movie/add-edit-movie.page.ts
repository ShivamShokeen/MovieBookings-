import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsService } from '../services/user-credentials.service';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.page.html',
  styleUrls: ['./add-edit-movie.page.scss'],
})
export class AddEditMoviePage implements OnInit {

  paramRequestType: string;
  checkMovieExistence: any;
  date = new Date;
  sameMovies: any;
  addMovie = {
    uid: this.userCredentials.UID,
    sellerName: this.userCredentials.userName,
    legalName: this.userCredentials.businessLegalName,
    customOrganizationName: this.userCredentials.businessCustomOrganizationName,
    startingDateOnHall: "",
    endingdateOnHall: "",
    movieDuration: "",
    name: "",
    images: "",
    dateOfRelease: "",
    category: "",
    createdDate: this.date,
    location: "",
    normalSeats: "",
    premiumSeats: "",
    facilities: "",
    price: "",
    premiumPrice: ""
  }

  //edit 

  editProducts: any;
  movieAlreadyExisted: any;
  arr = [];

  @ViewChild('f', { static: false }) f: NgForm;
  productDetails: any;
  constructor(private alertController: AlertController, private route: ActivatedRoute, private http: HttpClient, private router: Router, public userCredentials: UserCredentialsService, private movieCredentials: MovieCredentialsService, public toastController: ToastController,) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
      // this.userNotLoggedInError();
    }
    else {
      this.paramRequestType = this.route.snapshot.params['for'];
      this.addMovie.uid = this.userCredentials.UID;
      if (this.paramRequestType == 'edit') {
        let removeDup: any;
        let removeDup2: any;
        let filterCondition: any;
        let reference: any;
        let duplicateData = [];
        let duplicateData2 = [];
        reference = firebase.database().ref('/addMovies').on("value", (snapshot) => {
          let index: string;
          for (index in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(index)) {
              filterCondition = { ...snapshot.val()[index], id: index };
              if (filterCondition.images) {
                duplicateData.push(filterCondition);
                removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                this.editProducts = removeDup;
                this.getBusinessUserMovies();
              }

              if (filterCondition.movieAlreadyExist == 'yes') {
                duplicateData2.push(filterCondition);
                removeDup2 = duplicateData2.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                this.sameMovies = removeDup2;
                this.getExistedMoviesDetails();
              }
            }
          }
        },error =>{
          if(error.status == 401){
            this.errorMessage();
          }
        });
      }
    }
  }

  ngOnInit() {
  }

  addMovies(form) {
    if (form.valid) {
      if (this.movieCredentials.moviesList == undefined) {
        this.http.post('https://moviebooking-35404.firebaseio.com/addMovies.json', this.addMovie).subscribe(responseData => {
          console.log("Movie was added");
          this.router.navigate(['/home']);
        },error =>{
          this.errorMessage();
        })
      }
      else if (this.movieCredentials.moviesList != undefined) {
        this.checkMovieExistence = this.movieCredentials.moviesList.find((value) => value.name.replace(/ /g, "").toLocaleLowerCase() == form.value.name.replace(/ /g, "").toLocaleLowerCase());

        if (this.checkMovieExistence != undefined && this.checkMovieExistence.uid == this.userCredentials.userUID && this.checkMovieExistence.name == this.addMovie.name) {
          this.movieAlreadyCreatedByYouMessage();
        }
        else {
          if (this.checkMovieExistence == undefined) {
            this.http.post('https://moviebooking-35404.firebaseio.com/addMovies.json', this.addMovie).subscribe(responseData => {
              console.log("Movie was added");
              this.router.navigate(['/home']);
            },error => {
              this.errorMessage();
            })
          }
          else {
            this.movieExistenceImageMessage();
            let eliminateImage;
            eliminateImage = {
              uid: this.addMovie.uid,
              sellerName: this.userCredentials.userName,
              legalName: this.userCredentials.businessLegalName,
              customOrganizationName: this.userCredentials.businessCustomOrganizationName,
              startingDateOnHall: this.addMovie.startingDateOnHall,
              endingdateOnHall: this.addMovie.endingdateOnHall,
              movieDuration: this.addMovie.movieDuration,
              name: this.addMovie.name,
              category: this.addMovie.category,
              createdDate: this.addMovie.createdDate,
              location: this.addMovie.location,
              normalSeats: this.addMovie.normalSeats,
              premiumSeats: this.addMovie.premiumSeats,
              facilities: this.addMovie.facilities,
              price: this.addMovie.price,
              premiumPrice: this.addMovie.premiumPrice,
              movieAlreadyExist: "yes"
            }
            this.http.post('https://moviebooking-35404.firebaseio.com/addMovies.json', eliminateImage).subscribe(responseData => {
              this.router.navigate(['/home']);
            },error =>{
              if(error.status == 401){
                this.errorMessage();
              }
            })
          }
        }
      }
      else {
        console.log("Some thing went wrong")
      }
    }
    else {
      this.emptyFieldAlert();
    }
  }

  getBusinessUserMovies() {
    if (this.editProducts.length > 0 && this.paramRequestType == 'edit') {
      this.productDetails = this.editProducts.filter(value => this.userCredentials.UID == value.uid);
    }
  }

  getExistedMoviesDetails() {
    if (this.sameMovies.length > 0 && this.paramRequestType == 'edit') {
      this.movieAlreadyExisted = this.sameMovies.filter(value => this.userCredentials.UID == value.uid);
    }
  }


  deleteMovie(id) {
    this.errorMessage();
    // let specificUrl: string;
    // specificUrl = 'https://moviebooking-35404.firebaseio.com/addMovies/' + id + '.json';
    // this.http.delete(specificUrl).subscribe((data) => { });
    // this.deleteMessage();
    // this.router.navigate(['/home']);
  }

  //edit


  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter all the required detail's before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async deleteMessage() {
    const toast = await this.toastController.create({
      message: "Movie deleted successfully :)",
      duration: 5000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }

  async movieExistenceImageMessage() {
    const toast = await this.toastController.create({
      message: "You'r image,date of release will not be set because this is already posted by someone.",
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  async userNotLoggedInError() {
    const toast = await this.toastController.create({
      message: "You are not sign in.",
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

  async noMoviesFoundMessage() {
    const toast = await this.toastController.create({
      message: "No movies found :)",
      duration: 2000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }

  async movieAlreadyCreatedByYouMessage() {
    const toast = await this.toastController.create({
      message: "Movie already created by you :)",
      duration: 2000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async errorMessage() {
    const toast = await this.toastController.create({
      message: "You need to create your own firebase account and you can take help of 'Step video' that is available on my app 'BuildX Projects'.",
      duration: 4000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }


}
