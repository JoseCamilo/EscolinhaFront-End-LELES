import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pagamento } from "../../domain/pagamento/pagamento";
import { Cobranca } from "../../domain/cobranca/cobranca";
import { AddCobrancaPage } from "../addCobranca/addCobranca";
import { Aluno } from "../../domain/aluno/aluno";
import { CobrancaDao } from "../../domain/cobranca/cobranca-dao";
import { WsEscolas } from "../../providers/wsEscolas";
import { PagamentoDao } from "../../domain/pagamento/pagamento-dao";

@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html'
})
export class PagamentosPage {

  cobranca: Cobranca = new Cobranca();
  alunosDev: Aluno[] = [];
  pagsEstorno: Pagamento[] = []
  pagsConfirmados: Pagamento[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private storage: Storage,
              private _cobrancaDao: CobrancaDao,
              private _wsEscolas: WsEscolas,
              private _pagamentoDao: PagamentoDao) {
    
    if (navParams.get('cobranca')) {
      this.cobranca = navParams.get('cobranca') as Cobranca;
    }
  }

  ionViewDidEnter(){
    this.loadAlunos();
  }
  
  loadAlunos(){
    console.log("loadalunos");
    this._pagamentoDao.loadAlunosPagamento(this.cobranca)
      .then((res) => {
        // atualiza cobranca
        let pos = res.cobrancas.map(function(e) { return e._id; });
        let poscobranca = pos.indexOf(this.cobranca._id);
        this.cobranca = res.cobrancas[poscobranca];

        this.alunosDev = this._pagamentoDao.alunosDev;
        this.pagsEstorno = this._pagamentoDao.pagsEstorno;
        this.pagsConfirmados = this._pagamentoDao.pagsConfirmados;
      });
    
    
  }

  addPagamento(aluno){
    let prompt = this.alertCtrl.create({
      title: 'Pagamento',
      message: "Informe o valor que foi pago!",
      inputs: [
        {
          name: 'valor',
          value: this.cobranca.valor,
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
            
            this._pagamentoDao.savePagamento(this.cobranca, aluno, data.valor)
              .then((res) => {
                
                // atualiza cobranca
                let pos = res.cobrancas.map(function(e) { return e._id; });
                let poscobranca = pos.indexOf(this.cobranca._id);
                this.cobranca = res.cobrancas[poscobranca];

                this.loadAlunos()
              });
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
          handler: () => {
            
          }
        },
        {
          text: 'Estornar',
          handler: () => {
            this.showConfirmEstorno(aluno);
          }
        }
      ]
    });
    prompt.present();
  }

  showConfirmEstorno(aluno) {
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

            this._pagamentoDao.saveEstorno(this.cobranca, aluno)
              .then((res) => {
                
                // atualiza cobranca
                let pos = res.cobrancas.map(function(e) { return e._id; });
                let poscobranca = pos.indexOf(this.cobranca._id);
                this.cobranca = res.cobrancas[poscobranca];

                this.loadAlunos()
               });
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

  reenvia(){
    this._wsEscolas.reenviaEscolas()
      .then((res) => {
        // atualiza cobranca
        let pos = res.cobrancas.map(function(e) { return e._id; });
        let poscobranca = pos.indexOf(this.cobranca._id);
        this.cobranca = res.cobrancas[poscobranca];

        this.loadAlunos()
      })
      .catch(err => console.log(err));
  }

}