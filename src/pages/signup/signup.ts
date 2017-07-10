import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { usercreds } from '../../models/interfaces/usercreds';
//import { AngularFireDatabaseModule} from 'angularfire2/database';
//import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as usercreds;
//  database = firebase.database();
  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public nav: NavController, public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private keyboard: Keyboard, public userProvider: UserProvider) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */


  signupUser(){
    this.keyboard.close();
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then((authData) => {
        this.userProvider.newUser(authData);
        this.user=this.userProvider.getUser(authData);
        this.nav.setRoot(HomePage, this.user);

      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.dismiss();
    }
  }



}
