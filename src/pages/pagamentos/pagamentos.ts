import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pagamento } from "../../domain/pagamento/pagamento";
import { AddPagamentoPage } from "../addPagamento/addPagamento";
import { Cobranca } from "../../domain/cobranca/cobranca";
import { AddCobrancaPage } from "../addCobranca/addCobranca";

@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html'
})
export class PagamentosPage {

  title: string;
  pagamentos: Pagamento[] = [];
  cobranca: Cobranca = new Cobranca();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
    
    if (navParams.get('cobranca')) {
      this.cobranca = navParams.get('cobranca') as Cobranca;
      this.title = this.cobranca.title;
      this.pagamentos = this.cobranca.pagamentos;
    }
  }

  addTurma(){
    this.navCtrl.push(AddPagamentoPage);
  }

  itemSelected(pagamento){
    this.navCtrl.push(AddPagamentoPage,{
      pagamento: pagamento
    });
  }

  editCobranca(){
    this.navCtrl.push(AddCobrancaPage, {
      cobranca: this.cobranca
    });
  }

}
