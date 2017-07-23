import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Data } from '../providers/data';
import { AuthProvider } from '../providers/auth/auth';
import { LessonsdataProvider } from '../providers/lessonsdata/lessonsdata'
import { UserProvider } from '../providers/user/user';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';



const firebaseConfig = {
  apiKey: "AIzaSyC0MeXf0W5UlOGDfa9v8NHxkrOMRNLfbSM",
  authDomain: "quiz-f5528.firebaseapp.com",
  databaseURL: "https://quiz-f5528.firebaseio.com",
  projectId: "quiz-f5528",
  storageBucket: "quiz-f5528.appspot.com",
  messagingSenderId: "311789864779"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SplashScreen,
    StatusBar, Data, AuthProvider, LessonsdataProvider, Keyboard, UserProvider]
})
export class AppModule {}
