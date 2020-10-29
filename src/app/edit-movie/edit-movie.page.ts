import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { UserCredentialsService } from '../services/user-credentials.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {

  urlParameterId: string;
  editProducts: any;
  editMovies: FormGroup;
  date = new Date;
  products: any;
  constructor(private route: ActivatedRoute, private router: Router, public movieCredentials: MovieCredentialsService, public userCredentials: UserCredentialsService, private http: HttpClient, public toastController: ToastController) {
    this.urlParameterId = this.route.snapshot.params['id'];
    let removeDup: any;
    let filterCondition: any;
    let reference: any;
    let duplicateData = [];
    reference = firebase.database().ref('/addMovies').on("value", (snapshot) => {
      let index: string;
      for (index in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(index)) {
          filterCondition = { ...snapshot.val()[index], id: index };
          duplicateData.push(filterCondition);
          removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
          this.products = removeDup;
        }
      }
    });
  }

  ngOnInit() {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
    if (this.products) {
      this.editProducts = this.products.find(value => value.id == this.urlParameterId);
      this.customForm();
    }
  }

  customForm() {
    // let redesignFormat:any;
    // redesignFormat = {
    //   id : this.editProducts.id,
    //   category: this.editProducts.category,
    //   images: this.editProducts.images,
    //   dateOfRelease: this.editProducts.dateOfRelease,
    //   createdDate: this.editProducts.createdDate,
    //   modifyDate: this.editProducts.modifyDate,
    //   facilities: this.editProducts.facilities,
    //   legalName: this.editProducts.legalName,
    //   location: this.editProducts.location,
    //   name: this.editProducts.name,
    //   normalSeats: this.editProducts.normalSeats,
    //   premiumSeats: this.editProducts.premiumSeats,
    //   price: this.editProducts.price,
    //   premiumPrice: this.editProducts.premiumPrice,
    //   sellerName: this.editProducts.sellerName,
    //   uid: this.editProducts.uid,
    //   movieAlreadyExist: "yes"
    // }
    this.editMovies = new FormGroup({
      'id': new FormControl(this.editProducts.id),
      'category': new FormControl(this.editProducts.category),
      'images': new FormControl(this.editProducts.images),
      'dateOfRelease': new FormControl(this.editProducts.dateOfRelease),
      'createdDate': new FormControl(this.editProducts.createdDate),
      'modifyDate': new FormControl(this.date),
      'facilities': new FormControl(this.editProducts.facilities),
      'legalName': new FormControl(this.editProducts.legalName),
      'location': new FormControl(this.editProducts.location),
      'name': new FormControl(this.editProducts.name),
      'normalSeats': new FormControl(this.editProducts.normalSeats),
      'premiumSeats': new FormControl(this.editProducts.premiumSeats),
      'price': new FormControl(this.editProducts.price),
      'premiumPrice': new FormControl(this.editProducts.premiumPrice),
      'sellerName': new FormControl(this.editProducts.sellerName),
      'uid': new FormControl(this.editProducts.uid),
      'movieAlreadyExist': new FormControl(this.editProducts.movieAlreadyExist)
    });
  }

  updateMovie(movies) {
    if (movies.valid) {
      let specificUrl: string;
      specificUrl = 'https://moviebooking-35404.firebaseio.com/addMovies/' + this.urlParameterId + '.json';
      this.http.put(specificUrl, movies.value).subscribe(responseData => {
        this.successMessage();
        this.router.navigate(['/home']);
      },error =>{
        this.errorMessage();
      })
    }
    else {
      this.emptyField();
      this.errorInfo();
    }
  }

  async emptyField() {
    const toast = await this.toastController.create({
      message: 'Your need to fill required details.',
      duration: 2000
    });
    toast.present();
  }

  async successMessage() {
    const toast = await this.toastController.create({
      message: 'Updated successfully.',
      duration: 2000
    });
    toast.present();
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You need to signin again and I am working on this.',
      duration: 7000,
      position: 'bottom',
    });
    toast.present();
  }

  async errorInfo() {
    const toast = await this.toastController.create({
      message: "Red line means 'Required field' and green line means 'Optional field' :)",
      duration: 7000,
      position: 'bottom',
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
