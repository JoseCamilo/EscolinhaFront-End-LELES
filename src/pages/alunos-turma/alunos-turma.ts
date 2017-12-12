import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";
import { AddAlunoPage } from "../addAluno/addAluno";
import { Turma } from "../../domain/turma/turma";
import { AddAlunoTurmaPage } from "../addAlunoTurma/addAlunoTurma";

@Component({
  selector: 'page-alunos-turma',
  templateUrl: 'alunos-turma.html'
})
export class AlunosTurmaPage {

  alunos: Aluno[] = [];
  turma: Turma = new Turma()
  title: string;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public navParams: NavParams) {
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
          this.title = res.nome;

          let pos = res.turmas.map(function(e) { return e._id; });
          let posTurma = pos.indexOf(this.turma._id);

          this.alunos = res.turmas[posTurma].alunos;
        }
      });
  }

  addAluno(){
    this.navCtrl.push(AddAlunoTurmaPage);
  }

  itemSelected(aluno){
    this.navCtrl.push(AddAlunoPage,{
      aluno: aluno
    });
  }
}
