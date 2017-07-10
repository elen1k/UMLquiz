import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

	id:any;
	data: any;

	tfid:any;
	tfdata: any;

	constructor(public http: Http) {

	}

	load(quizid){

		if(this.id==quizid){
			return Promise.resolve(this.data);

		}

		return new Promise(resolve => {

			console.log('assets/data/questions'+quizid+'.json');

			this.http.get('assets/data/questions'+quizid+'.json').map(res => res.json()).subscribe(data => {
				this.data = data.questions;
				resolve(this.data);
			});

		});

	}

	loadTrueFalse(quizid){

		if(this.tfid==quizid){
			return Promise.resolve(this.tfdata);

		}

		return new Promise(resolve => {

			console.log('assets/data/truefalse'+quizid+'.json');

			this.http.get('assets/data/truefalse'+quizid+'.json').map(res => res.json()).subscribe(data => {
				this.tfdata = data.questions;
				resolve(this.tfdata);
			});

		});

	}

}
