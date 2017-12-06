import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EscolasPage } from "../escolas/escolas";

@Component({
  selector: 'page-liberacao',
  templateUrl: 'liberacao.html'
})
export class LiberacaoPage {

  token: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private storage: Storage) {

  }

  login(){
    if(this.token){
      this.storage.set('token', this.token);
      this.navCtrl.setRoot(EscolasPage);
    }else{
      this.showErrorAlert("Preencha o Token!");
    }
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
