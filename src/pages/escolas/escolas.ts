import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";
import { Escola } from "../../domain/escola/escola";
import { Aluno } from "../../domain/aluno/aluno";

@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html'
})
export class EscolasPage {

  escolas: Escola[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private storage: Storage) {

  }

  ionViewDidEnter(){
    this.loadEscolas();
  }

  loadEscolas(){
    this.storage.get('escolas').then((val) => {
        if(val){
          this.escolas = val;
        }
      });
  }

  itemSelected(escola){
    this.storage.set('setEscola', escola);
    this.navCtrl.setRoot(TabsPage);
  }

  newEscola(){
    this.showPrompt();
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showErrorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Nova Escola',
      message: "Coloque o nome da nova escola",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {

          }
        },
        {
          text: 'Salvar',
          handler: data => {
            let nomeEscola = data.nome;
            if(nomeEscola){
              let newescola = new Escola(nomeEscola, [new Aluno('Aluno A '+nomeEscola) , new Aluno('Aluno B '+nomeEscola)])
              this.escolas.push(newescola);
              this.storage.set('escolas', this.escolas);
            }else{
              this.showErrorAlert("Preencha o Nome da Escola!");
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
