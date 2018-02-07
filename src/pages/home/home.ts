import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {KeyedCollection} from "../../helper/KeyedCollection";
import {forEach} from "typescript-collections/dist/lib/arrays";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ActionWord: string;
  SearchWord: string;
  Dictionary: KeyedCollection<Words>;

  constructor(public navCtrl: NavController, public serviveProvider: ServiceProvider) {
    this.serviveProvider.getDictionaryStorage().subscribe(data=>{
      console.log("data received");
      let result = <Words[]>data;
      this.Dictionary = new KeyedCollection<Words>();
      for(var i=0;i<result.length;i++){
        this.Dictionary.Add(result[i].Descr, result[i]);
      }

    });
  }

  search(){
    debugger;
    this.SearchWord = this.ActionWord;
    console.log(this.ActionWord);
    console.log(this.Dictionary.Item(this.ActionWord));
  }
}

interface Words{
  Descr: string;
  Details: Array<Details>;
}

interface Details {
  POS: string;
  Definition: string;
  Examples: Array<Examples>;
}

interface Examples {
  Descr: string;
}
