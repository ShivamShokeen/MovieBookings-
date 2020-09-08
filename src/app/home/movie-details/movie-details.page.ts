import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredentialsService } from 'src/app/services/movie-credentials.service';
import { UserCredentialsService } from 'src/app/services/user-credentials.service';
import { ToastController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { SeatsPage } from 'src/app/seats/seats.page';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  seatsSelection = false;

  totalNormalSeats = [];
  totalPremiumSeats = [];
  selected = [];
  showSeats = false;
  sellerProductId: any;
  moviePosterUrl: string;
  // ends Seat booking 
  //some boolean variables
  disableOtherBookSeats = false;
  // end boolean variables
  paramRequestType: any;
  movieDescription: any;
  relatedPost: any;
  sellerDetails: any;
  relatedMoviesList: any;

  constructor(private route: ActivatedRoute, public movieCredentials: MovieCredentialsService, public userCredentials: UserCredentialsService, public toastController: ToastController, private router: Router, public modalController: ModalController,) { }

  ngOnInit() {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
      this.userNotLoggedInError();
    }
    else {
      this.paramRequestType = this.route.snapshot.params['id'];
      this.initiateFirst();
    }
  }

  initiateFirst() {
    let movieName: any;
    let userUID: any;

    this.movieDescription = this.movieCredentials.moviesList.filter((value) => value.id == this.paramRequestType);

    if (this.movieDescription.length > 0) {
      this.movieDescription.forEach(element => {
        movieName = element.name;
        userUID = element.uid;
        this.moviePosterUrl = element.images;
      });

      let filterCondition: any;
      let reference: any;
      let duplicateData = [];
      let removeDup: any;
      reference = firebase.database().ref('/addMovies').on("value", (snapshot) => {
        let index: string;
        for (index in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(index)) {
            filterCondition = { ...snapshot.val()[index], id: index };
            if (filterCondition.name.toLocaleLowerCase() == movieName.toLocaleLowerCase()) {
              duplicateData.push(filterCondition);
            }
            removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            this.relatedMoviesList = removeDup
          }
        }
      });
    }

    this.relatedPost = this.movieCredentials.moviesList.filter((value) => value.name.toLocaleLowerCase() == movieName.toLocaleLowerCase())
    if (userUID) {
      this.sellerDetails = this.userCredentials.allUserAccountDetails.filter((value) => value.uid == userUID);
    }

  }

  async presentModal(id, name, location, normalSeats, normalSeatsPrice, premiumSeats, premiumSeatsPrice) {
    const modal = await this.modalController.create({
      component: SeatsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'movieList': this.relatedMoviesList,
        'id': id,
        'name': name,
        'location': location,
        'normalSeats': normalSeats,
        'normalSeatsPrice': normalSeatsPrice,
        'premiumSeats': premiumSeats,
        'premiumSeatsPrice': premiumSeatsPrice,
        'moviePosterUrl': this.moviePosterUrl
      }
    });
    return await modal.present();
  }

  async scrollDown() {
    const toast = await this.toastController.create({
      message: "Scroll down.",
      duration: 2000,
      position: "middle"
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

  // seatCalculation(sellerProductId, name, location, normalSeats, normalSeatsPrice, premiumSeats, premiumSeatsPrice) {
  //   this.disableOtherBookSeats = true;
  //   this.showSeats = true;
  //   this.scrollDown();
  //   let i = 0;
  //   for (i = 1; i <= normalSeats; i++) {
  //     this.totalNormalSeats.push({
  //       id: i.toString(),
  //       price: normalSeatsPrice,
  //       type: "normalSeat",
  //       sellerProductId: sellerProductId,
  //       name: name,
  //       location: location,
  //       images: this.moviePosterUrl,
  //     });
  //   }
  //   let j = 0;
  //   for (j = 1; j <= premiumSeats; j++) {
  //     this.totalPremiumSeats.push({
  //       id: j.toString(),
  //       price: premiumSeatsPrice,
  //       type: "premiumSeat",
  //       sellerProductId: sellerProductId,
  //       name: name,
  //       location: location,
  //       images: this.moviePosterUrl,
  //     })
  //   }
  // }

  // selectedSeat(sellerProductId, name, images, location, seatId, seatPrice, seatType) {
  //   let uid;
  //   uid = this.userCredentials.UID;
  //   this.seatsSelection = true;
  //   if (this.selected.length < 1) {
  //     this.selected.push({
  //       id: seatId,
  //       price: seatPrice,
  //       type: seatType,
  //       uid: uid,
  //       sellerProductId: sellerProductId,
  //       name: name,
  //       location: location,
  //       images: images
  //     });
  //   }
  //   else {
  //     let verifyDuplicacy: any;
  //     verifyDuplicacy = this.selected.find((value) => value.id == seatId.toString() && value.type == seatType && value.sellerProductId == sellerProductId);
  //     if (verifyDuplicacy != undefined) {
  //       this.duplicateSelection();
  //     }
  //     else {
  //       this.selected.push({
  //         id: seatId,
  //         price: seatPrice,
  //         type: seatType,
  //         uid: uid,
  //         sellerProductId: sellerProductId,
  //         name: name,
  //         location: location,
  //         images: images
  //       });
  //     }
  //   }
  //   this.movieCredentials.addToCart(this.selected);
  //   this.movieCredentials.shoppingList = this.selected;
  // }

  // clearSelectedBookingSeats() {
  //   this.disableOtherBookSeats = false;
  //   let normalSeatsLength: any;
  //   let premiumSeatsLength: any;
  //   normalSeatsLength = this.totalNormalSeats.length;
  //   premiumSeatsLength = this.totalPremiumSeats.length;
  //   this.totalNormalSeats.splice(0, normalSeatsLength);
  //   this.totalPremiumSeats.splice(0, premiumSeatsLength);
  // }

}