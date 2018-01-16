import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatePicker } from "@ionic-native/date-picker";
import { Jogo } from "../../domain/jogo/jogo";
import { JogoDao } from "../../domain/jogo/jogo-dao";

@Component({
  selector: 'page-add-jogo',
  templateUrl: 'addJogo.html'
})
export class AddJogoPage {

  jogo: Jogo = new Jogo();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public datePicker: DatePicker,
              private _jogoDao: JogoDao) {

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

  saveJogo(){
    this._jogoDao.save(this.jogo)
      .then(res => this.navCtrl.pop())
      .catch(err => console.log(err));
  }

  deleteJogo(){
    this._jogoDao.delete(this.jogo)
      .then(res => this.navCtrl.popToRoot())
      .catch(err => console.log(err));
  }
}
