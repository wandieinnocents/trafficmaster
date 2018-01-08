import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform,AlertController} from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { ListMasterPage } from '../pages/list-master/list-master';
import { SearchPage } from '../pages/search/search';
import { ContentPage } from '../pages/content/content';
import { CodePage } from '../pages/code/code';
import { SettingsPage } from '../pages/settings/settings';
import { CardsPage } from '../pages/cards/cards';
import { StartpagePage } from '../pages/startpage/startpage';
import { ContactPage } from '../pages/contact/contact';
import { FeedbackPage } from '../pages/feedback/feedback';
import { TripsPage } from '../pages/trips/trips';

import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';






@Component({

  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title >Traffic App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        <ion-icon name="{{ p.icon }}" item-left></ion-icon>
          {{p.title}}
        </button>
      </ion-list>


      <ion-footer class="fixed">
      <ion-navbar color="secondary">
      <ion-title >Traffic Application v1.0 </ion-title>
      </ion-navbar>

      </ion-footer>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  // rootPage = FirstRunPage;
  rootPage = TabsPage;

  // rootPage = StartpagePage;


  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
      { title: 'Home', component: 'TabsPage', icon: 'home' },
      { title: 'User Updates', component: 'UserupdatesPage', icon: 'chatbubbles'},
      { title: 'My Trips', component: 'SearchPage', icon: 'pin'},
      { title: 'Incidents Nearby', component: 'CodePage', icon: 'warning'},
      // { title: 'Notifications', component: 'CardsPage', icon: 'notifications'},
      // { title: 'My Account', component: 'SettingsPage', icon: 'person' },
      // { title: 'Settings', component: 'SettingsPage', icon: 'settings'},
      // { title: 'How to', component: 'ListMasterPage', icon: 'information'}
  ]

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private afAuth: AngularFireAuth,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public alertCtrl:AlertController,
    public push: Push

    ) {
    //auth implementation
    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = LoginPage;
      else
        this.rootPage = TabsPage;
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.pushsetup();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

//push the notification

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: 'here you SENDER IR from FCM'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }


//end of push

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
