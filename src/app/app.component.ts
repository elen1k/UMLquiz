//import firebase from 'firebase';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//import { ChapterPage } from '../pages/chapter/chapter';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { Data } from '../providers/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, afAuth: AngularFireAuth, private splashScreen: SplashScreen,
    private statusBar: StatusBar, private keyboard: Keyboard) {
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
