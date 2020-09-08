import { Component, OnInit } from '@angular/core';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {

  constructor(public movieCredentials: MovieCredentialsService, private router: Router, public toastController: ToastController) {
    if (this.movieCredentials.shoppingList == undefined) {
      this.router.navigate(['/home']);
      this.emptyCart();
    }
  }

  ngOnInit() {
  }

  async emptyCart() {
    const toast = await this.toastController.create({
      message: "Your cart is empty.",
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }
}
