import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Data } from '../../providers/data';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ChapterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;

  hidePicture: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

  user = {} as usercreds;
  count = 0;
  score = 0;
  newscore : number;
  progress : string;
  progresscount : number;
  lesson: any;
  questions: any;

  description: any;
  id: any;
  name: any;
  image: any;
  arrayimage: string[] = new Array(15);
  paragraphs: string[] = new Array(15);

  i:number;
  color : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public auth:AuthProvider, public userProvider: UserProvider, public toastCtrl: ToastController, public alertCtrl: AlertController ) {

  }

  ionViewDidLoad() {

    this.user = this.userProvider.getUser(firebase.auth().currentUser);
    console.log(this.user);

    console.log(this.user.chapter1);

    console.log('ionViewDidLoad ChapterPage');

    this.slides.lockSwipes(true);
    this.description=this.navParams.get('description');
    this.id=this.navParams.get('id');
    this.name=this.navParams.get('name');
    this.image=this.navParams.get('image');
    for(this.i = 0;this.i<=14;this.i++) {
        this.arrayimage[this.i]=this.navParams.get('image'+this.i);
        this.paragraphs[this.i]=this.navParams.get('p'+this.i);
    };

    switch(this.id) {
      case 0: {
        this.hidePicture[2]=true;
        this.progress='chapter1';
        this.progresscount=this.user.chapter1;
        break;
      }
      case 1: {
        this.hidePicture[5]=true;
        this.hidePicture[14]=true;
        this.progress='chapter2';
        this.progresscount=this.user.chapter2;
        break;
      }
      case 2: {
        this.hidePicture[2]=true;
        this.progress='chapter3';
        this.progresscount=this.user.chapter3;
        break;
      }
      case 3: {
        this.hidePicture[2]=true;
        this.hidePicture[9]=true;
        this.progress='chapter4';
        this.progresscount=this.user.chapter4;
        break;
      }
      case 4: {
        this.hidePicture[13]=true;
        this.progress='chapter5';
        this.progresscount=this.user.chapter5;
        break;
      }
      case 5: {
        this.hidePicture[3]=true;
        this.progress='chapter6';
        this.progresscount=this.user.chapter6;
        break;
      }
      case 6: {
        this.hidePicture[1]=true;
        this.hidePicture[2]=true;
        this.hidePicture[3]=true;
        this.hidePicture[4]=true;
        this.hidePicture[5]=true;
        this.hidePicture[6]=true;
        this.hidePicture[7]=true;
        this.hidePicture[8]=true;
        this.hidePicture[9]=true;
        this.hidePicture[10]=true;
        this.progress='chapter7';
        this.progresscount=this.user.chapter7;
        break;
      }
    }


    console.log(this.name);

    this.dataService.load(this.id+1).then((data) => {

      let originalOrderData = data;
      data = this.randomizeQuestions(originalOrderData);

      data.map((question) => {

            let originalOrderQ = question.answers;
            question.answers = this.randomizeAnswers(originalOrderQ);
            return question;

        });

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
    message: '+1 πόντος',
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
      this.score++;
      this.color='green';
      this.presentToast();
    }else{
      this.color='red';
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

  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = rawAnswers[i];
        rawAnswers[i] = rawAnswers[j];
        rawAnswers[j] = temp;
    }

    return rawAnswers;

  }

  restartQuiz(){
    this.newscore = this.user.score + this.score;
    this.userProvider.upDateUserScore(this.newscore);
    if (this.count>this.progresscount){
      this.userProvider.upDateUserprogress(this.progress, this.count);
    }
    this.count = 0;
		this.score = 0;

    let originalOrderData = this.questions;
    this.questions = this.randomizeQuestions(originalOrderData);

    this.questions.map((question) => {

            let originalOrderQ = question.answers;
            question.answers = this.randomizeAnswers(originalOrderQ);
            return question;

        });

    this.slides.lockSwipes(false);
		this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
	}

  GoToHomePage(){
    this.newscore = this.user.score + this.score;
    this.userProvider.upDateUserScore(this.newscore);

    if (this.count>this.progresscount){
      this.userProvider.upDateUserprogress(this.progress, this.count);
    }

    this.count = 0;
    this.score = 0;

    let originalOrderData = this.questions;
    this.questions = this.randomizeQuestions(originalOrderData);

    this.questions.map((question) => {

            let originalOrderQ = question.answers;
            question.answers = this.randomizeAnswers(originalOrderQ);
            return question;

        });

    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
    }

    GoToLessonsPage(){
      this.newscore = this.user.score + this.score;
      this.userProvider.upDateUserScore(this.newscore);

      if (this.count>this.progresscount){
        this.userProvider.upDateUserprogress(this.progress, this.count);
      }

      this.navCtrl.pop();
    }

}
