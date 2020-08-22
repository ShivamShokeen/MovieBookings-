import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserCredentialsService } from 'src/app/services/user-credentials.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.page.html',
  styleUrls: ['./business-signup.page.scss'],
})
export class BusinessSignupPage implements OnInit {

  organizationDetails = {
    name: "",
    email: "",
    password: "",
    legalName: "",
    checkedTC: false,
    city: "",
    country: "",
    address: "",
    zipcode: "",
    siteOfOrganization: "",
    phoneVerification: "",
    phoneNumber: "",
    customerCareNumber: "",
    accountType: "business",
    image: "",
    uid: ""
  }
  businessRegistration = true;
  businessName = false;
  businessAddress = false;
  createdUserDetail;
  constructor(private alertController: AlertController, private toastController: ToastController, public userCredentials: UserCredentialsService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
  }

  Submit(form: NgForm) {
    if (form.valid) {
      let duplicateEmailId: any;
      console.log(form.value.userEmail)
      this.userCredentials.fetchUserDetails();
      if (this.userCredentials.allUserAccountDetails) {
        duplicateEmailId = this.userCredentials.allUserAccountDetails.filter((value) => form.value.userEmail == value.email);
        console.log(duplicateEmailId)
        if (duplicateEmailId.length == 0) {
          console.log(form.value);
          this.businessName = true;
          this.businessRegistration = false;
        }
        else {
          this.duplicateEmail();
        }
      }
    }
    else {
      this.businessName = false;
      this.businessRegistration = true;
    }
  }
  firmName(form) {
    if (form.valid) {
      console.log(form.value);
      let duplicateFirmName: any;
      this.userCredentials.fetchUserDetails();
      if (this.userCredentials.allUserAccountDetails) {
        duplicateFirmName = this.userCredentials.allUserAccountDetails.filter((value) => this.organizationDetails.legalName == value.legalName);
        console.log(duplicateFirmName);
      }
      if (duplicateFirmName.length == 0) {
        this.businessName = false;
        this.businessAddress = true;
      } else {
        this.duplicateName();
        this.businessName = true;
        this.businessAddress = false;
      }
    }
  }
  sellerInformation(form: NgForm) {
    if (form.valid == true) {
      console.log(form.value);
      firebase.auth().createUserWithEmailAndPassword(this.organizationDetails.email, this.organizationDetails.password)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.organizationDetails.name
              });
            }
            console.log(userLogginDetails.uid);
            this.organizationDetails.uid = userLogginDetails.uid;
            this.http.post('https://moviebooking-35404.firebaseio.com/userAccounts.json', this.organizationDetails).subscribe(responseData => {
              console.log("User signup successfully");
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })

      this.signupSuccessMessage();
      this.router.navigate(['/user-credentials/signin']);
    } else {
      this.emptyFieldAlert();
      console.log(form);
    }
  }

  async signupErrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  async signupSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Transfering to Signin/Login :)',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  async duplicateName() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Name already exist.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async duplicateEmail() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Email id already exist.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async emptyFieldAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Please enter all the detail's before submitting.",
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  async Workinprogress() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: "Work in Progress.",
      animated: true,
      buttons: ['OK']
    });
    await alert.present();
  }


}
