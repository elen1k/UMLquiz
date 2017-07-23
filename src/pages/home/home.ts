import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthProvider, public userProvider: UserProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    console.log(firebase.auth().currentUser);
    this.user=this.userProvider.getUser(firebase.auth().currentUser);
  }


  goToLessons(){
    this.navCtrl.push('LessonsPage', this.user);
  }

  goToQuiz(){
    this.navCtrl.push('QuizPage');
  }

  logout(){
    this.auth.logoutUser();
    this.navCtrl.setRoot('LoginPage');
  }

  goToAbout(){
    this.navCtrl.push('AboutPage');
  }

  goToHall(){
    this.navCtrl.push('HallPage');
  }

  goToProgress(){
    this.navCtrl.push('ProgressPage');
  }
}
