import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Cobranca } from "./cobranca";

@Injectable()
export class CobrancaDao {

    constructor(private _storage: Storage,
                private _numDao: NumeradorDao) {}

    private _getKey() {
        return this._numDao.getNum();
    }

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

    save(cobranca: Cobranca) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        return this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(cobranca._id){
                                    let pos2 = escolas[posEscola].cobrancas.map(function(e) { return e._id; });
                                    let poscobranca = pos2.indexOf(cobranca._id);
                                    escolas[posEscola].cobrancas[poscobranca] = cobranca;

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }else{
                                    this._getKey()
                                        .then((key) => {
                                            cobranca._id = key;
                                            escolas[posEscola].cobrancas.push(cobranca);

                                            this._storage.set('setEscola', escolas[posEscola]);                                        
                                            return this._storage.set("escolas", escolas);
                                        });
                                }
                            });
                    });
    }

    delete(cobranca: Cobranca) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        return this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(cobranca._id){
                                    let pos2 = escolas[posEscola].cobrancas.map(function(e) { return e._id; });
                                    let poscobranca = pos2.indexOf(cobranca._id);
                                    //escolas[posEscola].cobrancas.splice(poscobranca,1);
                                    escolas[posEscola].cobrancas[poscobranca].deletado = true;

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }
                            });
                    });
    }
         
}
