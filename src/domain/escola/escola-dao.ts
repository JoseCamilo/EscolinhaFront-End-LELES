import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Escola } from "./escola";

@Injectable()
export class EscolaDao {

    constructor(private _storage: Storage,
                private _numDao: NumeradorDao) {}

    private _getKey() {
        return this._numDao.getNum();
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

    save(escola: Escola) {
        return  this._getEscolas()
                    .then((dados) => {
                        let escolas: Escola[] = [];
                        if(dados){
                            escolas = dados;
                        }                    
                                                                    
                        if(escola._id){
                            let pos = escolas.map(function(e) { return e._id; });
                            let posEscola = pos.indexOf(escola._id);
                            escolas[posEscola] = escola;
                            return this._storage.set("escolas", escolas);
                        }else{
                            this._getKey()
                                .then((key) => {
                                    escola._id = key;
                                    escolas.push(escola);
                                    return this._storage.set("escolas", escolas);
                                });

                        }
                    });
    }
         
}
