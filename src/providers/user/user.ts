import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';


@Injectable()
export class UserProvider {
  items: FirebaseListObservable<any>;
  user = {} as usercreds;

  constructor(public afAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
    this.items = afdb.list('/users');
    console.log(this.items);
  }

/*loginUser(email:string, password:string):firebase.Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
}*/

getUser(authData){
    console.log(authData);
    firebase.database().ref('/users/' + authData.uid).on('value', (snapshot) => {
      this.user.score = snapshot.val().score;
      this.user.chapter1 = snapshot.val().chapter1;
      this.user.chapter2 = snapshot.val().chapter2;
      this.user.chapter3 = snapshot.val().chapter3;
      this.user.chapter4 = snapshot.val().chapter4;
      this.user.chapter5 = snapshot.val().chapter5;
      this.user.chapter6 = snapshot.val().chapter6;
      this.user.chapter7 = snapshot.val().chapter7;
      this.user.easy = snapshot.val().easy;
      this.user.medium = snapshot.val().medium;
      this.user.hard = snapshot.val().hard;
    });
    this.user.id=authData.uid;
    this.user.email=authData.email;
    return this.user;

}

upDateUserScore(scoredata){
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
      score: scoredata
    });
}

upDateUserprogress(progress, count){
    switch(progress) {
      case 'chapter1': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter1: count
        });
        break;
      }
      case 'chapter2': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter2: count
        });
        break;
      }
      case 'chapter3': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter3: count
        });
        break;
      }
      case 'chapter4': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter4: count
        });
        break;
      }
      case 'chapter5': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter5: count
        });
        break;
      }
      case 'chapter6': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter6: count
        });
        break;
      }
      case 'chapter7': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          chapter7: count
        });
        break;
      }
      case 'easy': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          easy: count
        });
        break;
      }
      case 'medium': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          medium: count
        });
        break;
      }
      case 'hard': {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
          hard: count
        });
        break;
      }
    }
}

newUser(authData){
  firebase.database().ref('users/' + authData.uid).set({
    email: authData.email,
    score: 0,
    chapter1: 0,
    chapter2: 0,
    chapter3: 0,
    chapter4: 0,
    chapter5: 0,
    chapter6: 0,
    chapter7: 0,
    easy: 0,
    medium: 0,
    hard: 0,
});
}

getallusers() {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/').orderByChild('score').limitToLast(5).once('value',(snapshot) => {
        let userdata = snapshot.val();
        console.log(userdata);
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
}


}
