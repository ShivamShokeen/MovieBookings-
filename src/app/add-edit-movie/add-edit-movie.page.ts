import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsService } from '../services/user-credentials.service';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.page.html',
  styleUrls: ['./add-edit-movie.page.scss'],
})
export class AddEditMoviePage implements OnInit {

  paramRequestType: string;
  checkMovieExistence: any;
  date = new Date;
  addMovie = {
    uid: this.userCredentials.UID,
    sellerName: this.userCredentials.userName,
    legalName: this.userCredentials.businessLegalName,
    customOrganizationName: this.userCredentials.businessCustomOrganizationName,
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
  arr = [];

  @ViewChild('f', { static: false }) f: NgForm;
  productDetails: any;
  constructor(private alertController: AlertController, private route: ActivatedRoute, private http: HttpClient, private router: Router, public userCredentials: UserCredentialsService, private movieCredentials: MovieCredentialsService, public toastController: ToastController,) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
      this.userNotLoggedInError();
    }
    else {
      this.paramRequestType = this.route.snapshot.params['for'];
      this.addMovie.uid = this.userCredentials.UID;
      this.getBusinessUserMovies();
    }
  }

  ngOnInit() {
  }

  addMovies(form) {
    if (form.valid) {
      let id: any;
      console.log(this.addMovie.name);
      this.checkMovieExistence = this.movieCredentials.moviesList.find((value) => value.name.replace(/ /g, "").toLocaleLowerCase() == form.value.name.replace(/ /g, "").toLocaleLowerCase());
      console.log(this.checkMovieExistence)
      if (this.checkMovieExistence == undefined) {
        this.http.post('https://moviebooking-35404.firebaseio.com/addMovies.json', this.addMovie).subscribe(responseData => {
          console.log("Movie was added");
          this.router.navigate(['/home']);
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
          name: this.addMovie.name,
          category: this.addMovie.category,
          createdDate: this.addMovie.createdDate,
          location: this.addMovie.location,
          normalSeats: this.addMovie.normalSeats,
          premiumSeats: this.addMovie.premiumSeats,
          facilities: this.addMovie.facilities,
          price: this.addMovie.price,
          premiumPrice: this.addMovie.premiumPrice
        }
        console.log("Movie existed")
        this.http.post('https://moviebooking-35404.firebaseio.com/addMovies.json', eliminateImage).subscribe(responseData => {
          console.log("Movie was added");
          this.router.navigate(['/home']);
        })
      }
    }
    else {
      this.emptyFieldAlert();
    }
  }

  getBusinessUserMovies() {
    if (this.movieCredentials.moviesList && this.paramRequestType == 'edit') {
      let removeDuplictes: any;
      removeDuplictes = this.movieCredentials.moviesList.filter(value => this.userCredentials.UID == value.uid);
      console.log(removeDuplictes)
       this.productDetails = removeDuplictes.filter((v,i,a)=>a.findIndex(t=>(t.images && t.name == v.name)) ==i);;
    }
    console.log(this.productDetails);
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

}
