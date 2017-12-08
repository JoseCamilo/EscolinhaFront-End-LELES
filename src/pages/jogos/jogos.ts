import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Jogo } from "../../domain/jogo/jogo";
import { AddJogoPage } from "../addJogo/addJogo";

@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html'
})
export class JogosPage {

  title: string;
  jogos: Jogo[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ngOnInit(){
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

  addTurma(){
    this.navCtrl.push(AddJogoPage);
  }

  itemSelected(jogo){
    this.navCtrl.push(AddJogoPage,{
      jogo: jogo
    });
  }

}
