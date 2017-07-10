import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';

@Injectable()
export class UserProvider {

  user = {} as usercreds;
  constructor(public afAuth: AngularFireAuth ) {}

/*loginUser(email:string, password:string):firebase.Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
}*/

getUser(authData){
        firebase.database().ref('/users/' + authData.uid).on('value', (snapshot) => {
          this.user.score = snapshot.val().score;
        });
        this.user.id=authData.uid;
        this.user.email=authData.email;

      //  return Promise.resolve(this.user);
      return this.user;
}


upDateUserScore(scoredata){
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
      score: scoredata
    });
}

newUser(authData){
  firebase.database().ref('users/' + authData.uid).set({
    email: authData.email,
    score: 0
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
