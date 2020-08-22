import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MovieCredentialsService } from '../services/movie-credentials.service';
import { UserCredentialsService } from '../services/user-credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  searchInput: string;
  moviesDetails: any;
  constructor(public movieCredentials: MovieCredentialsService, public toastController: ToastController, public userCredentials: UserCredentialsService, private router: Router) { }

  ngOnInit() { 
    this.filterSearch();
  }

  filterSearch() {
    this.moviesDetails = this.movieCredentials.filterRecords(this.searchInput);
    console.log(this.moviesDetails);
    let removeDup: any;
     this.movieCredentials.moviesList.forEach((current) => {
      console.log(current.name);
      // console.log(index);
    }); 
    // console.log(removeDup);
  }
}
