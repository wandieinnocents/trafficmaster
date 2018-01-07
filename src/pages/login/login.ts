import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { AngularFireAuth } from 'angularfire2/auth';

import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 loginData = {
    email: '',
    password: ''
  }
  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) { }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      // Do custom things with auth
    })
    .catch(err => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 1000
      });
      toast.present();
    });
  }
  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }
}
