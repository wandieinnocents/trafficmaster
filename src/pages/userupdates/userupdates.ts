import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UserupdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userupdates',
  templateUrl: 'userupdates.html',
})
export class UserupdatesPage {
	
	posts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {

  	this.http.get('http://slickstars.com/api/traffic_updates')
  	.map(res => res.json()).subscribe(data => {
        this.posts = data.data;
    });
  	
  	
  }

  //refresh page
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserupdatesPage');
  }

 

}
