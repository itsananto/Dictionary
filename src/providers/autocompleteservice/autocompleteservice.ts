import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AutoCompleteService} from "ionic2-auto-complete";
import {KeyedCollection} from "../../helper/KeyedCollection";
import {ServiceProvider} from "../service/service";

/*
  Generated class for the AutocompleteserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteserviceProvider implements AutoCompleteService {

  labelAttribute = "name";
  AllWords: Array<string>;


  constructor(public http: HttpClient) {
    this.AllWords = new Array<string>();
    this.http.get('assets/json/storage.json').subscribe(data => {

      let result = <Words[]>data;

      for (var i = 0; i < result.length; i++) {
        this.AllWords.push(result[i].Descr);
      }
    });
  }

  getResults(keyword: string) {

    let retArray = new Array<string>();

    for (let i = 0; i < this.AllWords.length; i++) {
      if (this.AllWords[i].startsWith(keyword)) retArray.push(this.AllWords[i]);
    }
    return retArray;
  }

}

