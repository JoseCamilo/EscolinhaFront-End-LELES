import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno, AlunoChecked } from "../../domain/aluno/aluno";

import { Camera } from '@ionic-native/camera';
import { DatePicker } from "@ionic-native/date-picker";
import { AlunoDao } from "../../domain/aluno/aluno-dao";
import { Turma } from "../../domain/turma/turma";

@Component({
  selector: 'page-add-aluno-turma',
  templateUrl: 'addAlunoTurma.html'
})
export class AddAlunoTurmaPage {

  turma: Turma = new Turma();
  alunos: Aluno[] = [];
  title: string;
  alunosCkd: AlunoChecked[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              private camera: Camera,
              public datePicker: DatePicker,
              private _alunoDao: AlunoDao) {

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
          let pos = this.turma.alunos.map(function(e) { return e._id; });          

          res.alunos.forEach(element => {
            let posAluno = pos.indexOf(element._id);
            if(posAluno >= 0){
              this.alunosCkd.push(new AlunoChecked(true,element))
            }else{
              this.alunosCkd.push(new AlunoChecked(false,element))
            }
          });
        }
      });
  }
  

  saveAlunos(){
    console.log(this.alunosCkd);
    this.navCtrl.pop();
  }
}
