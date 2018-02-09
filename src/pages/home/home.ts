import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {KeyedCollection} from "../../helper/KeyedCollection";
import {AutocompleteserviceProvider} from "../../providers/autocompleteservice/autocompleteservice";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ActionWord: string;
  SearchWord: string;
  Dictionary: KeyedCollection<Words>;
  AllWords: string[];

  constructor(public navCtrl: NavController, public serviveProvider: ServiceProvider, public  autoCompleteProvider: AutocompleteserviceProvider) {

    this.serviveProvider.getDictionaryStorage().subscribe(data=>{

      let result = <Words[]>data;
      this.Dictionary = new KeyedCollection<Words>();
      this.AllWords = new Array<string>();

      for(var i=0;i<result.length;i++){
        this.Dictionary.Add(result[i].Descr, result[i]);
        this.AllWords.push(result[i].Descr);
      }

    });
  }

  search(){
    this.SearchWord = this.ActionWord;
    console.log(this.ActionWord);
    console.log(this.Dictionary.Item(this.ActionWord));
  }
}

