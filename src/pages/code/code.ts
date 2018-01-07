import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';



/**
 * Generated class for the CodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {
incidents: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {

  	//fetching nearby incidents
  	this.http.get('http://slickstars.com/api/incidents')
  	.map(res => res.json()).subscribe(data => {
        this.incidents = data.data;
    });

  }






  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
  }

}
