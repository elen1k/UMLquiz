import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
import { Data } from '../../providers/data';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MediumquizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mediumquiz',
  templateUrl: 'mediumquiz.html',
})
export class MediumquizPage {
  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  user = {} as usercreds;

  questions: any;

  count = 0;
  score = 0;
  newscore : number;

  progress : string;
  progresscount : number;

  color : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public userProvider: UserProvider, public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediumquizPage');

    this.user = this.userProvider.getUser(firebase.auth().currentUser);

    this.progress='medium';
    this.progresscount=this.user.medium;

    this.dataService.loadTrueFalse(2).then((data) => {

      let originalOrder = data;
      data = this.randomizeQuestions(originalOrder);

      this.questions = data;

    });
  }


  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    if(this.count==10) {
      this.showAlert();
      this.score=this.score*2;
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
    message: '+10 πόντοι',
    duration: 3000
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Συγχαρητήρια!',
      subTitle: 'Βρήκες όλες τις σωστές απαντήσεις και κέρδισες διπλάσιους πόντους!',
      buttons: ['OK']
    });
    alert.present();
  }

  selectAnswer(answer, question){

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if(answer.correct){
      this.count++;
      this.score=this.score+10;
      this.color='green';
      question.flashCardBack='Μπράβο! Το βρήκες!';
      this.presentToast();
    }else{
      this.color='red';
      question.flashCardBack='Λάθος απάντηση.';
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }

  randomizeQuestions(rawQuestions: any[]): any[] {

    for (let i = rawQuestions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = rawQuestions[i];
        rawQuestions[i] = rawQuestions[j];
        rawQuestions[j] = temp;
    }

    return rawQuestions;

  }
  restartQuiz(){
    this.newscore = this.user.score + this.score;
    this.userProvider.upDateUserScore(this.newscore);

    if (this.count>this.progresscount){
      this.userProvider.upDateUserprogress(this.progress, this.count);
    }
    this.count = 0;
    this.score = 0;

    let originalOrder = this.questions;
    this.questions = this.randomizeQuestions(originalOrder);

    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
  }

  GoToQuizPage(){
    this.newscore = this.user.score + this.score;
    this.userProvider.upDateUserScore(this.newscore);

    if (this.count>this.progresscount){
      this.userProvider.upDateUserprogress(this.progress, this.count);
    }
    
    this.navCtrl.pop();
  }


}
