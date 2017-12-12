import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Turma } from "../../domain/turma/turma";
import { AddTurmaPage } from "../addTurma/addTurma";
import { AlunosTurmaPage } from "../alunos-turma/alunos-turma";

@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html'
})
export class TurmasPage {

  title: string;
  turmas: Turma[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    
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

  addTurma(){
    this.navCtrl.push(AddTurmaPage);
  }

  itemSelected(turma){
    this.navCtrl.push(AlunosTurmaPage,{
      turma: turma
    });
  }

}
