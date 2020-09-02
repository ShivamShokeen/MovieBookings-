import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { WindowService } from './services/window.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './home/home.module';
import { UserCredentialsService } from './services/user-credentials.service';
import { MovieCredentialsService } from './services/movie-credentials.service';
import { SeatsPageModule } from './seats/seats.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    HomePageModule,
    SeatsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WindowService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
