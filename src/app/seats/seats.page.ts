import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { UserCredentialsService } from '../services/user-credentials.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.page.html',
  styleUrls: ['./seats.page.scss'],
})
export class SeatsPage implements OnInit {

  @Input() id: any;
  @Input() movieList: any;
  @Input() moviePosterUrl: any
  @Input() name: any;
  @Input() location: any;
  @Input() normalSeats: any
  @Input() normalSeatsPrice: any;
  @Input() premiumSeats: any;
  @Input() premiumSeatsPrice: any
  totalNormalSeats = [];
  totalPremiumSeats = [];
  selected = [];

  constructor(private route: ActivatedRoute, public movieCredentials: MovieCredentialsService, public userCredentials: UserCredentialsService, public toastController: ToastController, private router: Router, public modalController: ModalController,) { }

  ngOnInit() {
    this.seatCalculation();
  }

  seatCalculation() {
    let i = 0;
    for (i = 1; i <= this.normalSeats; i++) {
      this.totalNormalSeats.push({
        id: i.toString(),
        price: this.normalSeatsPrice,
        type: "normalSeat",
        sellerProductId: this.id,
        name: this.name,
        location: this.location,
        images: this.moviePosterUrl,
      });
    }
    let j = 0;
    for (j = 1; j <= this.premiumSeats; j++) {
      this.totalPremiumSeats.push({
        id: j.toString(),
        price: this.premiumSeatsPrice,
        type: "premiumSeat",
        sellerProductId: this.id,
        name: this.name,
        location: this.location,
        images: this.moviePosterUrl,
      })
    }
  }

  selectedSeat(sellerProductId, name, images, location, seatId, seatPrice, seatType) {
    let uid;
    uid = this.userCredentials.UID;
    if (this.movieCredentials.shoppingList.length < 1) {
      this.movieCredentials.shoppingList.push({
        id: seatId,
        price: seatPrice,
        type: seatType,
        uid: uid,
        sellerProductId: sellerProductId,
        name: name,
        location: location,
        images: images
      });
    }
    else {
      let verifyDuplicacy: any;
      verifyDuplicacy = this.movieCredentials.shoppingList.find((value) => value.id == seatId.toString() && value.type == seatType && value.sellerProductId == sellerProductId);
      if (verifyDuplicacy != undefined) {
        this.duplicateSelection();
      }
      else {
        this.movieCredentials.shoppingList.push({
          id: seatId,
          price: seatPrice,
          type: seatType,
          uid: uid,
          sellerProductId: sellerProductId,
          name: name,
          location: location,
          images: images
        });
      }
    }
    this.movieCredentials.addToCart(this.movieCredentials.shoppingList);
  }

  async duplicateSelection() {
    const toast = await this.toastController.create({
      message: "It's already selected.",
      duration: 4000,
      position: "top"
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
