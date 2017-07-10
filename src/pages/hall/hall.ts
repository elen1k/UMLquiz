import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
//import { usercreds } from '../../models/interfaces/usercreds';
import { UserProvider } from '../../providers/user/user';
//import * as firebase from 'firebase/app';

/**
 * Generated class for the HallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hall',
  templateUrl: 'hall.html',
})
export class HallPage {
  users :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthProvider, public userProvider: UserProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HallPage');
    this.userProvider.getallusers().then((res: any) => {
          this.users = res;
          this.users=this.users.sort(function(a, b){
              return b.score-a.score
          });
    });

  }

}
