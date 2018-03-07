import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {AutoCompleteModule} from "ionic2-auto-complete";
import { AutocompleteserviceProvider } from '../providers/autocompleteservice/autocompleteservice';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { OfflineserviceProvider } from '../providers/offlineservice/offlineservice';
import { Network } from '@ionic-native/network';

export const firebaseConfig = {
  apiKey: "AIzaSyDRC5H6C9oTqU6PwsLC4IkuV1zxMDdfx-g",
  authDomain: "dictionary-ea2bb.firebaseapp.com",
  databaseURL: "https://dictionary-ea2bb.firebaseio.com",
  projectId: "dictionary-ea2bb",
  storageBucket: "dictionary-ea2bb.appspot.com",
  messagingSenderId: "665540583523"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AutoCompleteModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutocompleteserviceProvider,
    AngularFireDatabase,
    OfflineserviceProvider,
    Network
  ]
})
export class AppModule {}
