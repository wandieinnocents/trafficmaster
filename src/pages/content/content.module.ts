import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ContentPage } from './content';
declare var google;

@NgModule({
  declarations: [
    ContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentPage),
    TranslateModule.forChild()
  ],
  exports: [
    ContentPage

  ]
})


export class ContentPageModule { 
  
  Destination: any = '';
  myLocation: any;

  calculateAndDisplayRoute() {

   let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);


        //geolocation 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

           
            map.setCenter(pos);
            this.myLocation = new google.maps.LatLong(pos);
          }, function() {
          });
        } else {
          // Browser doesn't support Geolocation
        }
        //end of current location
        directionsService.route({
          origin:this.myLocation,
          destination: this.Destination ,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

}
