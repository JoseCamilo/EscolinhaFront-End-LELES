import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatePicker } from "@ionic-native/date-picker";
import { Jogo } from "../../domain/jogo/jogo";

@Component({
  selector: 'page-add-jogo',
  templateUrl: 'addJogo.html'
})
export class AddJogoPage {

  jogo: Jogo = new Jogo();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              public datePicker: DatePicker) {

    if (navParams.get('jogo')) {
      this.jogo = navParams.get('jogo') as Jogo;
    }
    
  }
  
  selecionaData() {

    this.datePicker.show({
      date: new Date(), 
      mode: 'date'
    })
    .then(data => this.jogo.data = data.toISOString());

  }
}
