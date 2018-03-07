import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {KeyedCollection} from "../../helper/KeyedCollection";
import {AutocompleteserviceProvider} from "../../providers/autocompleteservice/autocompleteservice";
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import {AutoCompleteComponent} from "ionic2-auto-complete";
import {OfflineserviceProvider} from "../../providers/offlineservice/offlineservice";
import { Network } from '@ionic-native/network';


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

  constructor(public navCtrl: NavController, public offlineDataProvider: OfflineserviceProvider, public autoCompleteProvider: AutocompleteserviceProvider, public afDB: AngularFireDatabase, private network: Network) {

    this.IsNetworkAvailable = true;
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.IsNetworkAvailable = false;

      if(this.OfflineDictionary.Count() == 0) {
        this.offlineDataProvider.getDictionaryStorage().subscribe(data => {

          let result = <any[]>data;
          this.OfflineDictionary = new KeyedCollection<any>();

          for (var i = 0; i < result.length; i++) {
            this.OfflineDictionary.Add(result[i].Wrd, result[i]);
          }
        });
      }
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.IsNetworkAvailable = true;
    });
  }

  toggleExample(i) {
    this.WordDetails[i].openExample = !this.WordDetails[i].openExample;
  }

  toggleSynonym(i) {
    this.WordDetails[i].openSynonym = !this.WordDetails[i].openSynonym;
  }

  toggleSubsenses(i) {
    this.WordDetails[i].openSubsenses = !this.WordDetails[i].openSubsenses;
  }

  search(){
    this.WordDetails = null;
    let searchWord = this.ActionWord.keyword;

    if(this.IsNetworkAvailable) {
      this.afDB.list('dictionary/' + searchWord).valueChanges().subscribe(val =>
      {
        this.WordDetails = val;
      });
    }
    else {

      if (this.OfflineDictionary.ContainsKey(searchWord)) {
        this.WordDetails = this.OfflineDictionary.Item(searchWord).Details;
      }
    }
  }
}

