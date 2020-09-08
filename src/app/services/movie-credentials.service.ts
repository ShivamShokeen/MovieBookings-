import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserCredentialsService } from './user-credentials.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieCredentialsService {

  moviesList: any;
  totalPrice = [];
  k: any;
  movies: any;
  priceCaculation;
  shoppingList = [];
  removeDup: any;

  constructor(private http: HttpClient, private userCredentials: UserCredentialsService) {
    // let reference:any;
    // reference = firebase.database().ref('/addMovies').on("value",(snapshot) =>{
    //   console.log(snapshot.val());
    // })
  }

  filterRecords(userSearchInput) {
    if (this.moviesList.length > 0) {
      // this.removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      if (userSearchInput == undefined) {
        return this.moviesList
      }
      if (userSearchInput != undefined) {
        let removeDup: any;
        removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => (t.images && t.id === v.id)) === i);
        return removeDup.filter(items => {
          return items.name.toLocaleLowerCase().indexOf(userSearchInput.toLocaleLowerCase()) > -1
        })
      }
    }
  }
  addToCart(productLists) {
    let productList;
    productList = productLists.slice(-1);
    productList.forEach((value) => {
      this.totalPrice.push(value.price);
    });
    if (this.totalPrice.length > 0) {
      this.priceCaculation = this.totalPrice.map(a => a).reduce(function (a, b) {
        return a + b;
      })
    }
  }
}
