import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno, AlunoChecked } from "../../domain/aluno/aluno";

import { AlunoDao } from "../../domain/aluno/aluno-dao";
import { AddJogoPage } from "../addJogo/addJogo";
import { Jogo } from "../../domain/jogo/jogo";
import { JogoDao } from "../../domain/jogo/jogo-dao";

@Component({
  selector: 'page-add-aluno-jogo',
  templateUrl: 'addAlunoJogo.html'
})
export class AddAlunoJogoPage {

  jogo: Jogo = new Jogo();
  alunos: Aluno[] = [];
  title: string;
  alunosCkd: AlunoChecked[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              private _alunoDao: AlunoDao,
              private _jogoDao: JogoDao) {

    if (navParams.get('jogo')) {
      this.jogo = navParams.get('jogo') as Jogo;
    }
    
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }
  
  loadAlunos(){
    this.alunosCkd = [];
    this.storage.get('setEscola').then((res) => {
        if(res){
          let pos = this.jogo.alunos.map(function(e) { return e._id; });          

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
    this.jogo.alunos = [];
    this.alunosCkd.forEach(element =>{
      if (element.checked) {
        this.jogo.alunos.push(element.aluno);
      }
    });

    this._jogoDao.save(this.jogo)
      .then(res => this.navCtrl.pop())
      .catch(err => console.log(err));
  }

  editJogo(){
    this.navCtrl.push(AddJogoPage, {
      jogo : this.jogo
    });
  }
}
