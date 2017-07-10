import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChapterPage } from '../chapter/chapter';
import { LessonsdataProvider } from '../../providers/lessonsdata/lessonsdata';


/**
 * Generated class for the LessonsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html',
})
export class LessonsPage {

  lessons:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public LessonsData:LessonsdataProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonsPage');

    this.LessonsData.load().then((lessonsdata) => {

			//lessonsdata.map((lessons) => {
	    //  		return lessons;
//
	    //	});

	    	this.lessons = lessonsdata;

		});



  }

  itemSelected(lesson){
    this.navCtrl.push(ChapterPage, lesson);
  }

}
