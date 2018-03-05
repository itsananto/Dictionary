import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OfflineserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfflineserviceProvider {

  constructor(public http: HttpClient) {

  }

  getDictionaryStorage(){
    return this.http.get('assets/json/storage.json');
  }

}