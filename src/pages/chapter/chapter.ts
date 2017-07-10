import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  user = {} as usercreds;

  score = 0;
  newscore : number;

  questions: any;

  description: any;
  id: any;
  name: any;
  image: any;
  p1: any;
  p2: any;
  p3: any;
  p4: any;
  p5: any;
  p6: any;
  p7: any;
  p8: any;
  p9: any;
  p10: any;
  p11: any;
  p12: any;
  p13: any;
  p14: any;
  p15: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public auth:AuthProvider, public userProvider: UserProvider) {

  }

  ionViewDidLoad() {

      this.user = this.userProvider.getUser(firebase.auth().currentUser);
      console.log(this.user);



    console.log('ionViewDidLoad ChapterPage');

    this.slides.lockSwipes(true);

    this.description=this.navParams.get('description');
    this.id=this.navParams.get('id');
    this.name=this.navParams.get('name');
    this.image=this.navParams.get('image');
    this.p1=this.navParams.get('p1');
    this.p2=this.navParams.get('p2');
    this.p3=this.navParams.get('p3');
    this.p4=this.navParams.get('p4');
    this.p5=this.navParams.get('p5');
    this.p6=this.navParams.get('p6');
    this.p7=this.navParams.get('p7');
    this.p8=this.navParams.get('p8');
    this.p9=this.navParams.get('p9');
    this.p10=this.navParams.get('p10');
    this.p11=this.navParams.get('p11');
    this.p12=this.navParams.get('p12');
    this.p13=this.navParams.get('p13');
    this.p14=this.navParams.get('p14');
    this.p15=this.navParams.get('p15');


    console.log(this.name);

    this.dataService.load(this.id+1).then((data) => {

      data.map((question) => {

            let originalOrder = question.answers;
            console.log(originalOrder);
            question.answers = this.randomizeAnswers(originalOrder);
            console.log(question.answers);
            return question;

        });

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
      this.score++;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
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
		this.score = 0;

    this.questions.map((question) => {

            let originalOrder = question.answers;
            question.answers = this.randomizeAnswers(originalOrder);
            return question;

        });


    this.slides.lockSwipes(false);
		this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
	}

  GoToHomePage(){
    this.newscore = this.user.score + this.score;
    this.userProvider.upDateUserScore(this.newscore);
    this.score = 0;

    this.questions.map((question) => {

            let originalOrder = question.answers;
            question.answers = this.randomizeAnswers(originalOrder);
            return question;

        });

    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
    }

    GoToLessonsPage(){
      this.newscore = this.user.score + this.score;
      this.userProvider.upDateUserScore(this.newscore);
      this.navCtrl.pop();
      }

}
