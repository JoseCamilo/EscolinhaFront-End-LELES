import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatePicker } from "@ionic-native/date-picker";
import { Pagamento } from "../../domain/pagamento/pagamento";

@Component({
  selector: 'page-add-cobranca',
  templateUrl: 'addCobranca.html'
})
export class AddcobrancaPage {

  cobranca: Cobranca = new Cobranca();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              public datePicker: DatePicker) {

    if (navParams.get('pagamento')) {
      this.pagamento = navParams.get('pagamento') as Pagamento;
    }
    
  }
  
  selecionaData() {

    this.datePicker.show({
      date: new Date(), 
      mode: 'date'
    })
    .then(data => this.pagamento.data = data.toISOString());

  }
}
