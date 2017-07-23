import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LessonsdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LessonsdataProvider {

  lessonsdata:any;

  constructor(public http: Http) {
    console.log('Hello LessonsdataProvider Provider');
  }

  load(){

		if(this.lessonsdata){
			return Promise.resolve(this.lessonsdata);
		}

		return new Promise(resolve => {

			this.http.get('assets/data/quiz.json').map(res => res.json()).subscribe(data => {
				this.lessonsdata = data.lessons;
				resolve(this.lessonsdata);
			});

		});

	}

}
