import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Jogo } from "../../domain/jogo/jogo";
import { AddJogoPage } from "../addJogo/addJogo";
import { EscolasPage } from "../escolas/escolas";
import { AlunosJogoPage } from "../alunosJogo/alunosJogo";
import { JogoDao } from "../../domain/jogo/jogo-dao";
import { WsEscolas } from "../../providers/wsEscolas";

@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html'
})
export class JogosPage {

  title: string;
  jogos: Jogo[] = [];

  constructor(public navCtrl: NavController, 
              public appCtrl: App, 
              private storage: Storage,
              private _jogoDao: JogoDao,
              private _wsEscolas: WsEscolas) {
    
  }

  ionViewDidEnter(){
    this.loadJogos();
    
  }

  loadJogos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.jogos = res.jogos;
        }
      });
  }

  filterJogosOfDelete(){
    return this.jogos.filter(x => !(x.deletado && x.confirmado));
  }

  addJogo(){
    this.navCtrl.push(AddJogoPage);
  }

  itemSelected(jogo){
    this.navCtrl.push(AlunosJogoPage,{
      jogo: jogo
    });
  }

  popToHome(){
    this.appCtrl.getRootNav().setRoot(EscolasPage);
  }

  reenvia(){
    this._wsEscolas.reenviaEscolas()
      .then(res => this.loadJogos())
      .catch(err => console.log(err));
  }
}
