import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Turma } from "../../domain/turma/turma";
import { TurmaDao } from "../../domain/turma/turma-dao";

@Component({
  selector: 'page-add-turma',
  templateUrl: 'addTurma.html'
})
export class AddTurmaPage {

  turma: Turma = new Turma();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private _turmaDao: TurmaDao) {

    if (navParams.get('turma')) {
      this.turma = navParams.get('turma') as Turma;
    }
    
  }

  saveTurma(){
    this._turmaDao.save(this.turma)
      .then(res => this.navCtrl.pop())
      .catch(err => console.log(err));
  }

  deleteTurma(){
    this._turmaDao.delete(this.turma)
      .then(res => this.navCtrl.popToRoot())
      .catch(err => console.log(err));
  }
}
