import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";
import { AddAlunoPage } from "../addAluno/addAluno";
import { Turma } from "../../domain/turma/turma";
import { AddAlunoTurmaPage } from "../addAlunoTurma/addAlunoTurma";
import { WsEscolas } from "../../providers/wsEscolas";

@Component({
  selector: 'page-alunos-turma',
  templateUrl: 'alunosTurma.html'
})
export class AlunosTurmaPage {

  alunos: Aluno[] = [];
  turma: Turma = new Turma()

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public navParams: NavParams,
              private _wsEscolas: WsEscolas) {
                
    if (navParams.get('turma')) {
      this.turma = navParams.get('turma') as Turma;
    }
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }

  loadAlunos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          let pos = res.turmas.map(function(e) { return e._id; });
          let posTurma = pos.indexOf(this.turma._id);

          this.alunos = res.turmas[posTurma].alunos;
        }
      });
  }

  addAluno(){
    this.navCtrl.push(AddAlunoTurmaPage,{
      turma: this.turma
    });
  }

  itemSelected(aluno){
    this.navCtrl.push(AddAlunoPage,{
      aluno: aluno
    });
  }

  reenvia(){
    this._wsEscolas.reenviaEscolas()
      .then(res => this.loadAlunos())
      .catch(err => console.log(err));
  }
}
