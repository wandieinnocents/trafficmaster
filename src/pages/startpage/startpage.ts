import { Component,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';

declare var google;

/**
 * Generated class for the StartpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startpage',
  templateUrl: 'startpage.html',
})
export class StartpagePage {
	Start: any;
	End: any;

  //adding current location declarations
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public geolocation: Geolocation,
   private auth: AngularFireAuth
   ) {


  }

  //signingOutAuthenticated Users
  signOut() {
    this.auth.auth.signOut();
  }

//load map current location
 ionViewDidLoad(){
    this.loadMap();
  }

// ngAfterViewInit() {
//     console.log("afterinit");
//     setTimeout(() => {
//       console.log(this.abc.nativeElement.innerText);
//     }, 1000);
//   }

  loadMap(){

 this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }
//adding markers
addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Welcome to Citi Master, This is where you are,!</h4>";         
 
  this.addInfoWindow(marker, content);
 
}
//adding informaiton winoow when a user taps on the marker
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}


  //calculate route function
   calculateAndDisplayRoute(directionsService, directionsDisplay) {

   		//initialise map
   		var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);

        //end of init map function
        directionsService.route({
          origin: this.Start,
          destination: this.End,
          travelMode: 'DRIVING',
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad StartpagePage');
  // }





}
