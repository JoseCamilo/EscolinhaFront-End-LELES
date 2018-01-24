import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Aluno } from "../aluno/aluno";
import { Pagamento } from "./pagamento";
import { Cobranca } from "../cobranca/cobranca";

@Injectable()
export class PagamentoDao {

    alunosDev: Aluno[] = [];
    pagsEstorno: Pagamento[] = []
    pagsConfirmados: Pagamento[] = [];

    constructor(private _storage: Storage) {}

    private _getIdEscola(){
        return this._storage.get('setEscola').then((res) => {
        if(res){
            return res._id;
        }else{
            return null;
        }
      });
    }

    private _getEscolas(){
        return this._storage.get('escolas').then((res) => {
        if(res){
            return res;
        }else{
            return null;
        }
      });
    }

    loadAlunosPagamento(refCobranca){
        this.alunosDev = [];
        this.pagsEstorno = [];
        this.pagsConfirmados = [];

        return this._getIdEscola()
                    .then((idEscola) =>{
                        
                       return this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;

                                // busca escola atual
                                let pos1 = escolas.map(function(e) { return e._id; });
                                let posEscola = pos1.indexOf(idEscola);
                                let escola = escolas[posEscola];

                                // busca cobranca
                                let pos2 = escola.cobrancas.map(function(e) { return e._id; });
                                let poscobranca = pos2.indexOf(refCobranca._id);
                                let cobranca = escola.cobrancas[poscobranca];

                                // analisa alunos que pagaram
                                let pos3 = cobranca.pagamentos.map(function(e) { return e.aluno._id; });          
                                escola.alunos.forEach(element => {
                                    if (cobranca.data > element.inscricao){
                                        let posAluno = pos3.indexOf(element._id);

                                        if(posAluno >= 0 && cobranca.pagamentos[posAluno].pago){
                                            this.pagsConfirmados.push(cobranca.pagamentos[posAluno]);
                                        }else if(posAluno >= 0 && !cobranca.pagamentos[posAluno].pago && !cobranca.pagamentos[posAluno].confirmado){
                                            this.pagsEstorno.push(cobranca.pagamentos[posAluno]);
                                        }else{
                                            if(!element.deletado){
                                                element.confirmado = true;
                                                this.alunosDev.push(element);
                                            }
                                        }
                                    }
                                });

                                return escola;
                                    
                            });
                    });

        
        
    }

    savePagamento(refCobranca: Cobranca, aluno: Aluno, valor: string) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        return this._getEscolas()
                            .then((dados) => {
                                // busca escola posicionada
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                let escola = escolas[posEscola];

                                // busca cobranca
                                let pos2 = escola.cobrancas.map(function(e) { return e._id; });
                                let poscobranca = pos2.indexOf(refCobranca._id);
                                let cobranca = escola.cobrancas[poscobranca];

                                // verifica se aluno ja fez pagamento alguma vez
                                let pos3 = cobranca.pagamentos.map(function(e) { return e.aluno._id; });
                                let pospagamento = pos3.indexOf(aluno._id);
                                
                                if(pospagamento >= 0){
                                    escolas[posEscola].cobrancas[poscobranca].pagamentos[pospagamento].confirmado = false;
                                    escolas[posEscola].cobrancas[poscobranca].pagamentos[pospagamento].pago = true;
                                }else{
                                    escolas[posEscola].cobrancas[poscobranca].pagamentos.push(new Pagamento(aluno, valor));
                                }

                                this._storage.set("escolas", escolas);
                                return this._storage.set('setEscola', escolas[posEscola]);
                                
                            });
                    });
    }

    saveEstorno(refCobranca: Cobranca, aluno: Aluno) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        return this._getEscolas()
                            .then((dados) => {
                                // busca escola posicionada
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                let escola = escolas[posEscola];

                                // busca cobranca
                                let pos2 = escola.cobrancas.map(function(e) { return e._id; });
                                let poscobranca = pos2.indexOf(refCobranca._id);
                                let cobranca = escola.cobrancas[poscobranca];

                                // verifica se aluno ja fez pagamento alguma vez
                                let pos3 = cobranca.pagamentos.map(function(e) { return e.aluno._id; });
                                let pospagamento = pos3.indexOf(aluno._id);
                                
                                if(pospagamento >= 0){
                                    escolas[posEscola].cobrancas[poscobranca].pagamentos[pospagamento].confirmado = false;
                                    escolas[posEscola].cobrancas[poscobranca].pagamentos[pospagamento].pago = false;
                                }

                                this._storage.set("escolas", escolas);
                                return this._storage.set('setEscola', escolas[posEscola]);
                                
                            });
                    });
    }
}