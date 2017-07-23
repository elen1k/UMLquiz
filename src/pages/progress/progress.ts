import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
//import { Data } from '../../providers/data';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ProgressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {
  user = {} as usercreds;
  colors : string[] = new Array(10);
  chapters: string[] = new Array(10);
  progresses: number[] = new Array(10);
  i : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');

    this.user = this.userProvider.getUser(firebase.auth().currentUser);

    for(this.i = 0;this.i<=6;this.i++) {

        this.chapters[this.i]=('Lesson '+(this.i+1));
    };
    this.progresses[0]=this.user.chapter1;
    this.progresses[1]=this.user.chapter2;
    this.progresses[2]=this.user.chapter3;
    this.progresses[3]=this.user.chapter4;
    this.progresses[4]=this.user.chapter5;
    this.progresses[5]=this.user.chapter6;
    this.progresses[6]=this.user.chapter7;


    this.progresses[7]=this.user.easy;
    this.chapters[7]=('Easy Quiz');
    this.progresses[8]=this.user.medium;
    this.chapters[8]=('Medium Quiz');
    this.progresses[9]=this.user.hard;
    this.chapters[9]=('Hard Quiz');
    console.log(this.progresses);
    console.log(this.chapters);

    for(this.i = 0;this.i<=9;this.i++) {
        if (this.progresses[this.i]==10){
          this.colors[this.i]='secondary';
        }
        else{
          this.colors[this.i]='dark';
        }
    };
    console.log(this.colors);
  }

}
