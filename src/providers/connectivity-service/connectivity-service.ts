import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConnectivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ConnectivityServiceProvider Provider');
  }

}
