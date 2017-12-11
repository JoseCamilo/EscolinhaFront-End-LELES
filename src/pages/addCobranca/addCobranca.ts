import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatePicker } from "@ionic-native/date-picker";
import { Cobranca } from "../../domain/cobranca/cobranca";

@Component({
  selector: 'page-add-cobranca',
  templateUrl: 'addCobranca.html'
})
export class AddCobrancaPage {

  cobranca: Cobranca = new Cobranca();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              public datePicker: DatePicker) {

    if (navParams.get('cobranca')) {
      this.cobranca = navParams.get('cobranca') as Cobranca;
    }
    
  }
  
  selecionaData() {

    this.datePicker.show({
      date: new Date(), 
      mode: 'date'
    })
    .then(data => this.cobranca.data = data.toISOString());

  }

  saveCobranca(){

  }

  deleteCobranca(){

  }
  
}
