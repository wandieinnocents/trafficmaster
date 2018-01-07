import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage,NavParams, NavController, ToastController,AlertController} from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
 signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    private navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    public translateService: TranslateService,
    private afAuth: AngularFireAuth) {

    this.signupData.email = this.navParams.get('email');

    // this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
    //   this.signupErrorString = value;
    // })




  }

  signup() {
    if(this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Sorry!',
        message: 'Your password and your re-entered password does not match each other.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

     // Firebase Signup Code
     this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
    .then(auth => {
      // Could do something with the Auth-Response
      console.log(auth);
    })
    .catch(err => {
      // Handle error
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }







  // doSignup() {
  //   // Attempt to login in through our User service
  //   this.user.signup(this.account).subscribe((resp) => {
  //     this.navCtrl.push(MainPage);
  //   }, (err) => {

  //     this.navCtrl.push(MainPage);

  //     // Unable to sign up
  //     let toast = this.toastCtrl.create({
  //       message: this.signupErrorString,
  //       duration: 3000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   });
  // }
}
