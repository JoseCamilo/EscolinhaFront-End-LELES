import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html'
})
export class EscolasPage {

  nome: string;
  escolas: string[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private storage: Storage) {

  }

  ionViewDidEnter(){
    console.log("viewdidenter");
    this.storage.get('escolas').then((val) => {
        if(val){
          this.escolas = val;
        }
      });
  }

  ngOnInit(){
    console.log("ngOnInit");
  }

  itemSelected(escola){
    this.storage.set('setEscola', 'escola'+escola);
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Saved clicked', data);
            this.nome = data.nome;
            if(this.nome){
              this.escolas.push(this.nome);
              this.storage.set('escolas', this.escolas)
              this.storage.set('escola'+this.nome, { escola : this.nome, alunos : [{nome:'Aluno A '+this.nome }, {nome:'Aluno B '+this.nome }] });
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
