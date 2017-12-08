import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Turma } from "../../domain/turma/turma";

@Component({
  selector: 'page-add-turma',
  templateUrl: 'addTurma.html'
})
export class AddTurmaPage {

  turma: Turma = new Turma();

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage) {

    if (navParams.get('turma')) {
      this.turma = navParams.get('turma') as Turma;
    }
    
  }
}
