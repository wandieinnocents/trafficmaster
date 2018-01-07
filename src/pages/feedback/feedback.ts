import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';




/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  data = {}

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public http: Http) {
    
               
        
  }

 



//postFeedback

postFeedback()

{

    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

     let data = {


                   

                first_name :'',
                last_name  :'',
                email      :'',
                contact    :'',
                location   :'',
                description:''

               

                
            };

             this.http.post("http://127.0.0.1:8000/api/feedback", data,options)
          .subscribe(data => {
            console.log(data['_body']);
            // console.log(data);
            // this.data = data._body;

         }, error => {
          console.log(error);// Error getting the data
        });
            console.log(data);

            this.http.post("http://127.0.0.1:8000/api/feedback", data,options);

}


//other demo

  //postRequestFunction
  // postFeedback() {
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   let options = new RequestOptions({ headers: headers });
 
  //   let postParams = {
      
  //               first_name: "wandie",
  //               last_name: "adlkada",
  //               email    : "adad",
  //               contact: "adad",
  //               location: "adad",
  //               description: "ada"
  //   }
    
  //   this.http.post("http://slickstars.com/api/feedback", postParams, options)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //       console.log(postParams);
  //       this.data = data._body;


  //      }, error => {
  //       console.log(error);// Error getting the data
  //     });
  // }







//toast
presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Feedback sent,Thank You!',
      duration: 3000
    });
    
    toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
