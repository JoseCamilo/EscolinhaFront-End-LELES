import { Component } from '@angular/core';
import { NavController, ViewController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";
import { AddAlunoPage } from "../addAluno/addAluno";
import { EscolasPage } from "../escolas/escolas";
import { AlunoDao } from "../../domain/aluno/aluno-dao";
import { WsEscolas } from "../../providers/wsEscolas";

@Component({
  selector: 'page-alunos',
  templateUrl: 'alunos.html'
})
export class AlunosPage {

  alunos: Aluno[] = [];
  title: string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public appCtrl: App,
              private storage: Storage,
              private _alunoDao: AlunoDao,
              private _wsEscolas: WsEscolas) {
    
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }

  loadAlunos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.alunos = res.alunos;
        }
      });
  }

  filterAlunosOfDelete(){
    return this.alunos.filter(x => !(x.deletado && x.confirmado));
  }

  addAluno(){
    this.navCtrl.push(AddAlunoPage);
  }

  itemSelected(aluno){
    this.navCtrl.push(AddAlunoPage,{
      aluno: aluno
    });
  }

  popToHome(){
    this.appCtrl.getRootNav().setRoot(EscolasPage);
  }

  reenvia(){
    this._wsEscolas.reenviaEscolas()
      .then(res => this.loadAlunos())
      .catch(err => console.log(err));
  }
}
