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
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
//import * as firebase from 'firebase/app';
import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as usercreds;
//  database = firebase.database();
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private keyboard: Keyboard, public userProvider: UserProvider) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }



    loginUser(){
      this.keyboard.close();
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( (authData) => {
  //        this.database.ref('/users/' + authData.uid).once('value', (snapshot) => {
  //          this.user.score = snapshot.val().score;
  //        });
  //        this.user.id=authData.uid;
  //        this.user.email=authData.email;
  //        this.navCtrl.setRoot(HomePage, this.user);
          this.user=this.userProvider.getUser(authData);
          this.navCtrl.setRoot(HomePage, this.user);

        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
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
        this.loading.present();
      }
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

}
