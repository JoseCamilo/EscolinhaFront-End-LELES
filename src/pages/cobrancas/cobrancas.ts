import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pagamento } from "../../domain/pagamento/pagamento";
import { AddPagamentoPage } from "../addPagamento/addPagamento";

@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html'
})
export class PagamentosPage {

  title: string;
  pagamentos: Pagamento[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ngOnInit(){
    this.loadJogos();
    
  }

  loadJogos(){
    this.storage.get('setEscola').then((res) => {
        if(res){
          this.title = res.nome;
          this.pagamentos = res.pagamentos;
        }
      });
  }

  addTurma(){
    this.navCtrl.push(AddPagamentoPage);
  }

  itemSelected(pagamento){
    this.navCtrl.push(AddPagamentoPage,{
      pagamento: pagamento
    });
  }

}
