import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
import { Data } from '../../providers/data';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the HardquizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hardquiz',
  templateUrl: 'hardquiz.html',
})
export class HardquizPage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  user = {} as usercreds;

  questions: any;

  score = 0;
  newscore : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public userProvider: UserProvider, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HardquizPage');

    this.user = this.userProvider.getUser(firebase.auth().currentUser);

    this.dataService.loadTrueFalse(3).then((data) => {

      let originalOrder = data;
      data = this.randomizeQuestions(originalOrder);

      this.questions = data;

    });
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question){

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if(answer.correct){
      this.score=this.score+20;
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
    this.navCtrl.pop();
  }


}
