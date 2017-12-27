import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";
import { AddAlunoPage } from "../addAluno/addAluno";
import { Turma } from "../../domain/turma/turma";
import { AddAlunoTurmaPage } from "../addAlunoTurma/addAlunoTurma";
import { Jogo } from "../../domain/jogo/jogo";
import { AddAlunoJogoPage } from "../addAlunoJogo/addAlunoJogo";

@Component({
  selector: 'page-alunos-jogo',
  templateUrl: 'alunosJogo.html'
})
export class AlunosJogoPage {

  alunos: Aluno[] = [];
  jogo: Jogo = new Jogo()
  title: string;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public navParams: NavParams) {
    if (navParams.get('jogo')) {
      this.jogo = navParams.get('jogo') as Jogo;
    }
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }

  loadAlunos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;

          let pos = res.jogos.map(function(e) { return e._id; });
          let posJogo = pos.indexOf(this.jogo._id);

          this.alunos = res.jogos[posJogo].alunos;
        }
      });
  }

  addAluno(){
    this.navCtrl.push(AddAlunoJogoPage,{
      jogo: this.jogo
    });
  }

  itemSelected(aluno){
    this.navCtrl.push(AddAlunoPage,{
      aluno: aluno
    });
  }
}
