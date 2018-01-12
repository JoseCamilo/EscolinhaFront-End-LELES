import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatePicker } from "@ionic-native/date-picker";
import { Cobranca } from "../../domain/cobranca/cobranca";
import { CobrancaDao } from "../../domain/cobranca/cobranca-dao";

@Component({
  selector: 'page-add-cobranca',
  templateUrl: 'addCobranca.html'
})
export class AddCobrancaPage {

  cobranca: Cobranca = new Cobranca();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              public datePicker: DatePicker,
              private _cobrancaDao: CobrancaDao) {

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
    this._cobrancaDao.save(this.cobranca)
      .then(res => this.navCtrl.pop())
      .catch(err => console.log(err));
  }

  deleteCobranca(){
    this._cobrancaDao.delete(this.cobranca)
      .then(res => this.navCtrl.popToRoot())
      .catch(err => console.log(err));
  }
  
}
