import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";

@Component({
  selector: 'page-alunos',
  templateUrl: 'alunos.html'
})
export class AlunosPage {

  alunos: Aluno[] = [];
  title: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ionViewDidEnter(){
    
    console.log("didEnter");
  }

  ngOnInit(){
    console.log("onInit");
    this.loadAlunos();
    
  }

  ionViewCanEnter(){
    console.log("canView");
    
  }


  loadAlunos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.alunos = res.alunos;
        }
      });
  }
}
