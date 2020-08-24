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
  editMovies : FormGroup;
  date = new Date;
  constructor(private route: ActivatedRoute, private router: Router, public movieCredentials: MovieCredentialsService, public userCredentials: UserCredentialsService, private http: HttpClient, public toastController: ToastController) {
    this.urlParameterId = this.route.snapshot.params['id'];
    console.log(this.urlParameterId);
    // this.movieCredentials.fetchMovies();
  }

  ngOnInit() { 
    if(!this.userCredentials.UID){
      this.router.navigate(['/home']);
    }
    if (this.movieCredentials.moviesList) {
      this.editProducts = this.movieCredentials.moviesList.find(value => value.id == this.urlParameterId);
      console.log(this.editProducts);      
      this.customeForm();
    }
  }

  customeForm(){
    this.editMovies = new FormGroup({
      'id': new FormControl(this.editProducts.id),
      'category': new FormControl(this.editProducts.category),
      'images': new FormControl(this.editProducts.images),
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
    });
  }
  
  updateMovie(movies: NgForm){
    if(movies.valid){
      console.log(movies.value);
      let specificUrl : string;
      specificUrl = 'https://moviebooking-35404.firebaseio.com/addMovies/' + this.urlParameterId + '.json';
      this.http.put(specificUrl,movies.value).subscribe(responseData=>{
        this.successMessage();
        this.router.navigate(['/home']);
        // firebase.auth().signOut().then(() => {
        //   console.log("Sign-out successful.");
        //   this.userCredentials.UID = "";
        //   this.userCredentials.userUID = "";
        //   this.userCredentials.businessUserUID = "";
        //   this.userCredentials.userName = "";
        //   this.userCredentials.userId = "";
        //   this.logoutMessage();
        // this.movieCredentials.fetchMovies();
        //   this.router.navigate(['/home']);
        // }).catch((error) => {
        //   console.log(error);
        // });
      })
    }
    else{
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
}
