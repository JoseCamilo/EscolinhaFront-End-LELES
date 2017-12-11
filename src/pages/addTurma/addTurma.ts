import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
    this._turmaDao.save(this.turma);
    this.navCtrl.pop();
  }
}
