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
  OfflineDictionary: KeyedCollection<any>;
  IsNetworkAvailable: boolean;

  WordDetails: any;

  @ViewChild('ActionWord')
  ActionWord: AutoCompleteComponent;

  constructor(public navCtrl: NavController, public offlineDataProvider: OfflineserviceProvider, public autoCompleteProvider: AutocompleteserviceProvider, public afDB: AngularFireDatabase) {
    //TODO: Check network connectivity
    this.IsNetworkAvailable = true;

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

  toggleSection(i) {
    this.WordDetails[i].open = !this.WordDetails[i].open;
  }

  search(){
    this.WordDetails = null;
    let searchWord = this.ActionWord.keyword;

    if(this.IsNetworkAvailable) {
      this.afDB.list('dictionary/' + searchWord).valueChanges().subscribe(val =>
      {
        this.WordDetails = val[0];
      });
    }
    else {

      if (this.OfflineDictionary.ContainsKey(searchWord)) {
        this.WordDetails = this.OfflineDictionary.Item(searchWord).Details;
      }
    }
  }
}

