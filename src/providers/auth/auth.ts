import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {}

/*loginUser(email:string, password:string):firebase.Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
}*/

loginUser(email:string, password:string):firebase.Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}
resetPassword(email: string): firebase.Promise<any> {
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

logoutUser(): firebase.Promise<any> {
  return this.afAuth.auth.signOut();
}

signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
}

}
