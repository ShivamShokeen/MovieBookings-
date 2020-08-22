import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserCredentialsService } from './user-credentials.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieCredentialsService {

  moviesList = [];
  totalPrice = [];
  k: any;
  movies: any;
  priceCaculation;
  shoppingList: any;
  removeDup: any;

  constructor(private http: HttpClient, private userCredentials: UserCredentialsService) {
    this.fetchMovies();
    // this.movies = this.moviesList;
    // console.log(this.movies)
    // this.movies.forEach(current => {
    //   console.log(current.name);
    //   console.log(current);
    //   // console.log(index);
    // });
  }

  searchMovies(searchTerm) {
    if (searchTerm != undefined && this.moviesList.length > 0) {
      console.log(searchTerm);
      console.log(searchTerm.toLocaleLowerCase());
      return this.moviesList.filter(values => {
        return values.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1
      })
    }
  }
  fetchMovies() {
    let filterCondition: any;
    let duplicateData = [];
    let removeDup: any;
    this.http.get('https://moviebooking-35404.firebaseio.com/addMovies.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            filterCondition = { ...responseData[key], id: key };
            if (filterCondition.images) {
              // duplicateData.push(filterCondition);
              this.moviesList.push(filterCondition);

              // working fine use datasnap to get value
            //   let referance;
            //   referance = firebase.database().ref('/addMovies').on("value", function(snapshot) {
            //     console.log(snapshot.val());
            // });



              // this.removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
              // console.log(this.removeDup)
              // this.removeDup = this.k
              // console.log(duplicateData);
              // this.removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
              // console.log(this.removeDup)
              // this.removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
              // console.log(removeDup);
            }
            // this.moviesList.push({ ...responseData[key], id: key })
          }
        }
        this.k = this.removeDup
        // this.k.push(this.removeDup)
        return this.removeDup;
        //return this.moviesList;
      })
    ).subscribe(getData => {
      // console.log(getData);
    });

  
  }

  filterRecords(userSearchInput) {

    // this.removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
    console.log(this.removeDup)
    console.log(this.k);

    if (userSearchInput == undefined) {
      console.log(this.moviesList)
      // let removeDup: any;
      return this.moviesList
    }
    if (userSearchInput != undefined) {
      let removeDup: any;
      removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => ( t.images && t.id === v.id)) === i);
      console.log(removeDup);
      console.log(removeDup);
      return removeDup.filter(items => {
        return items.name.toLocaleLowerCase().indexOf(userSearchInput.toLocaleLowerCase()) > -1 
      })    
    }
















    // console.log(userSearchInput);
    // console.log(removeDup);
    // if(removeDup.length == 0){
    //   data = this.moviesList
    //   console.log(data)
    //   data = data.filter((v, i, a) => a.findIndex(t => ( t.images && t.id === v.id)) === i);
    //   console.log(data)
    // }
    // else{
    //   data = removeDup;
    //   console.log(data)
    // }
    // if (userSearchInput != undefined) {
    //   let removeDup: any;
    //   removeDup = this.moviesList.filter((v, i, a) => a.findIndex(t => ( t.images && t.id === v.id)) === i);
    //   console.log(removeDup);
    //   console.log(removeDup);
    //   return removeDup.filter(items => {
    //     return items.name.toLocaleLowerCase().indexOf(userSearchInput.toLocaleLowerCase()) > -1 
    //   })    
    // }
    //else

  }

  // filterRecords(userSearchInput) {
  //   let removeDuplictes: any;
  //   let moviesContent: any;
  //   let seen = new Set();
  //   let duplicate;
  //   if (userSearchInput == undefined) {
  //     removeDuplictes = this.moviesList;
  //     console.log(removeDuplictes);
  //     moviesContent = this.moviesList.filter((v,i,a)=>{a.findIndex(t=>(v.images))===i
  //       console.log(v)
  //     })
  //     console.log(moviesContent)
  //     return moviesContent
  // }
  //   if (this.moviesList != undefined || this.moviesList != null && userSearchInput != undefined) {
  //     return this.moviesList.find(items => {
  //       return items.name.toLocaleLowerCase().indexOf(userSearchInput.toLocaleLowerCase()) > -1 || items.location.toLocaleLowerCase().indexOf(userSearchInput.toLocaleLowerCase()) > -1
  //     })
  //   }
  // }

  addToCart(productLists) {
    let productList;
    productList = productLists.slice(-1);
    console.log(productList);
    productList.forEach((value) => {
      console.log(value.price);
      this.totalPrice.push(value.price);
    });
    console.log(productList);
    console.log(this.totalPrice);
    if (this.totalPrice.length > 0) {
      this.priceCaculation = this.totalPrice.map(a => a).reduce(function (a, b) {
        return a + b;
      })
    }
    console.log(this.priceCaculation)
  }
}
