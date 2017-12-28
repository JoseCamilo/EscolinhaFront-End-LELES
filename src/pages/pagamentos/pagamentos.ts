import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pagamento } from "../../domain/pagamento/pagamento";
import { AddPagamentoPage } from "../addPagamento/addPagamento";
import { Cobranca } from "../../domain/cobranca/cobranca";
import { AddCobrancaPage } from "../addCobranca/addCobranca";
import { Aluno } from "../../domain/aluno/aluno";
import { CobrancaDao } from "../../domain/cobranca/cobranca-dao";

@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html'
})
export class PagamentosPage {

  cobranca: Cobranca = new Cobranca();
  alunosDev: Aluno[] = [];
  alunosPag: Aluno[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private storage: Storage,
              private _cobrancaDao: CobrancaDao) {
    
    if (navParams.get('cobranca')) {
      this.cobranca = navParams.get('cobranca') as Cobranca;
    }
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }
  
  loadAlunos(){
    this.alunosDev = [];
    this.alunosPag = [];
    this.storage.get('setEscola').then((res) => {
        if(res){
          let pos = this.cobranca.pagamentos.map(function(e) { return e.aluno._id; });          

          res.alunos.forEach(element => {
            let posAluno = pos.indexOf(element._id);
            if(posAluno >= 0){
              this.alunosPag.push(element);
            }else{
              this.alunosDev.push(element);
            }
          });
        }
      });
  }

  addPagamento(aluno){
    let prompt = this.alertCtrl.create({
      title: 'Pagamento',
      message: "Informe o valor que foi pago!",
      inputs: [
        {
          name: 'valor',
          value: '80',
          placeholder: 'Valor'
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
            this.cobranca.pagamentos.push(new Pagamento(aluno, data.valor));
            this._cobrancaDao.save(this.cobranca);
            this.loadAlunos();
          }
        }
      ]
    });
    prompt.present();
  }

  lookPagamento(aluno){
    let pos = this.cobranca.pagamentos.map(function(e) { return e.aluno._id; });
    let posPag = pos.indexOf(aluno._id);
    
    let prompt = this.alertCtrl.create({
      title: 'Pagamento',
      message: "Pago R$ " + this.cobranca.pagamentos[posPag].valor + " em " + this.cobranca.pagamentos[posPag].data.substring(8,10)+"/"+this.cobranca.pagamentos[posPag].data.substring(5,7)+"/"+this.cobranca.pagamentos[posPag].data.substring(0,4),
      buttons: [
        {
          text: 'Fechar',
          handler: data => {
            
          }
        },
        {
          text: 'Estornar',
          handler: data => {
            this.showConfirmEstorno(posPag);
          }
        }
      ]
    });
    prompt.present();
  }

  showConfirmEstorno(posPag) {
    var that = this;
    let confirm = this.alertCtrl.create({
      title: 'Estornar',
      message: 'Tem certeza que deseja estornar?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
           
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.cobranca.pagamentos.splice(posPag,1);
            this._cobrancaDao.save(this.cobranca);
            this.loadAlunos();
          }
        }
      ]
    });
    confirm.present();
  }


  editCobranca(){
    this.navCtrl.push(AddCobrancaPage, {
      cobranca: this.cobranca
    });
  }

}
