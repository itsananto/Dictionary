import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {KeyedCollection} from "../../helper/KeyedCollection";
import {AutocompleteserviceProvider} from "../../providers/autocompleteservice/autocompleteservice";
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import {AutoCompleteComponent} from "ionic2-auto-complete";
import {OfflineserviceProvider} from "../../providers/offlineservice/offlineservice";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //ActionWord: string;
  SearchWord: string;
  OfflineDictionary: KeyedCollection<any>;
  items: Observable<any[]>;
  IsNetworkAvailable: boolean;

  WordDetails: any;

  @ViewChild('ActionWord')
  ActionWord: AutoCompleteComponent;

  constructor(public navCtrl: NavController, public offlineDataProvider: OfflineserviceProvider, public autoCompleteProvider: AutocompleteserviceProvider, public afDB: AngularFireDatabase) {
    //TODO: Check network connectivity
    this.IsNetworkAvailable = false;

    if(this.IsNetworkAvailable){

    }else{
      this.offlineDataProvider.getDictionaryStorage().subscribe(data=>{

        let result = <any[]>data;
        this.OfflineDictionary = new KeyedCollection<any>();

        for(var i=0;i<result.length;i++){
          this.OfflineDictionary.Add(result[i].Wrd, result[i]);
        }

      });
    }
  }

  search(){
    this.WordDetails = null;
    let searchWord = this.ActionWord.keyword;

    if(this.IsNetworkAvailable) {
      this.WordDetails = this.afDB.list('dictionary/' + searchWord).valueChanges();
    }
    else {

      if (this.OfflineDictionary.ContainsKey(searchWord)) {
        this.WordDetails = this.OfflineDictionary.Item(searchWord).Details;
      }
    }
  }
}

