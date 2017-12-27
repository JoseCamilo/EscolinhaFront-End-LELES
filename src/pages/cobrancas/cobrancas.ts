import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Cobranca } from "../../domain/cobranca/cobranca";
import { AddCobrancaPage } from "../addCobranca/addCobranca";
import { PagamentosPage } from "../pagamentos/pagamentos";
import { EscolasPage } from "../escolas/escolas";

@Component({
  selector: 'page-cobrancas',
  templateUrl: 'cobrancas.html'
})
export class CobrancasPage {

  title: string;
  cobrancas: Cobranca[] = [];

  constructor(public navCtrl: NavController, public appCtrl: App, private storage: Storage) {
    
  }

  ionViewDidEnter(){
    this.loadCobrancas();
  }

  loadCobrancas(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.cobrancas = res.cobrancas;
        }
      });
  }

  addCobranca(){
    this.navCtrl.push(AddCobrancaPage);
  }

  itemSelected(cobranca){
    this.navCtrl.push(PagamentosPage,{
      cobranca: cobranca
    });
  }

  popToHome(){
    this.appCtrl.getRootNav().setRoot(EscolasPage);
  }

}
