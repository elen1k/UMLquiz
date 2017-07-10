import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { LessonsPage } from '../pages/lessons/lessons';
import { ChapterPage } from '../pages/chapter/chapter';
import { QuizPage } from '../pages/quiz/quiz';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { HallPage } from '../pages/hall/hall';
import { EasyquizPage } from '../pages/easyquiz/easyquiz';
import { MediumquizPage } from '../pages/mediumquiz/mediumquiz';
import { HardquizPage } from '../pages/hardquiz/hardquiz';
import { FlashCardComponent } from '../components/flash-card/flash-card';
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
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    AboutPage,
    LessonsPage,
    ChapterPage,
    QuizPage,
    HallPage,
    EasyquizPage,
    MediumquizPage,
    HardquizPage,
    FlashCardComponent
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
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    AboutPage,
    LessonsPage,
    ChapterPage,
    QuizPage,
    HallPage,
    EasyquizPage,
    MediumquizPage,
    HardquizPage,
    FlashCardComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SplashScreen,
    StatusBar, Data, AuthProvider,
    LessonsdataProvider, Keyboard, UserProvider]
})
export class AppModule {}
