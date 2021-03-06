import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Turma } from "../../domain/turma/turma";
import { AddTurmaPage } from "../addTurma/addTurma";
import { AlunosTurmaPage } from "../alunosTurma/alunosTurma";
import { EscolasPage } from "../escolas/escolas";
import { WsEscolas } from "../../providers/wsEscolas";

@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html'
})
export class TurmasPage {

  title: string;
  turmas: Turma[] = [];

  constructor(public navCtrl: NavController, 
              public appCtrl: App, 
              private storage: Storage,
              private _wsEscolas: WsEscolas) {
    
  }

  ionViewDidEnter(){
    this.loadTurmas();
    
  }

  loadTurmas(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.turmas = res.turmas;
        }
      });
  }

  filterTurmasOfDelete(){
    return this.turmas.filter(x => !(x.deletado && x.confirmado));
  }

  addTurma(){
    this.navCtrl.push(AddTurmaPage);
  }

  itemSelected(turma){
    this.navCtrl.push(AlunosTurmaPage,{
      turma: turma
    });
  }

  popToHome(){
    this.appCtrl.getRootNav().setRoot(EscolasPage);
  }

  reenvia(){
    this._wsEscolas.reenviaEscolas()
      .then(res => this.loadTurmas())
      .catch(err => console.log(err));
  }
}
