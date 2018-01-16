import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno, AlunoChecked } from "../../domain/aluno/aluno";
import { DatePicker } from "@ionic-native/date-picker";
import { Turma } from "../../domain/turma/turma";
import { TurmaDao } from "../../domain/turma/turma-dao";
import { AddTurmaPage } from "../addTurma/addTurma";

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
              public datePicker: DatePicker,
              private _turmaDao: TurmaDao) {

    if (navParams.get('turma')) {
      this.turma = navParams.get('turma') as Turma;
    }
    
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }
  
  loadAlunos(){
    this.alunosCkd = [];
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
    this.turma.alunos = [];
    this.alunosCkd.forEach(element =>{
      if (element.checked) {
        this.turma.alunos.push(element.aluno);
      }
    });

    this._turmaDao.save(this.turma)
      .then(res => this.navCtrl.pop())
      .catch(err => console.log(err));
  }

  editTurma(){
    this.navCtrl.push(AddTurmaPage, {
      turma : this.turma
    });
  }
}
