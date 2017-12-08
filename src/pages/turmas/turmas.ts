import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Turma } from "../../domain/turma/turma";
import { AddTurmaPage } from "../addTurma/addTurma";

@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html'
})
export class TurmasPage {

  title: string;
  turmas: Turma[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ngOnInit(){
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
    this.navCtrl.push(AddTurmaPage,{
      turma: turma
    });
  }

}
