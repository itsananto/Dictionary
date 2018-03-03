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
  WordList: Array<string>;


  constructor(public http: HttpClient) {
    this.WordList = new Array<string>();

    this.http.get('assets/json/wordlist.json').subscribe(data => {

      let result = <string[]>data;
      for (var i = 0; i < result.length; i++) {
        this.WordList.push(result[i]);
      }
    });
  }

  getResults(keyword: string) {

    keyword = keyword.toLocaleLowerCase();

    let retArray = new Array<string>();
    retArray = this.WordList.filter(word=>word.toLocaleLowerCase().indexOf(keyword)>=0)
    return retArray;
  }

}

