import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Jogo } from "./jogo";

@Injectable()
export class JogoDao {

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

    save(jogo: Jogo) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(jogo._id){
                                    let pos2 = escolas[posEscola].jogos.map(function(e) { return e._id; });
                                    let posjogo = pos2.indexOf(jogo._id);
                                    escolas[posEscola].jogos[posjogo] = jogo;

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }else{
                                    this._getKey()
                                        .then((key) => {
                                            jogo._id = key;
                                            escolas[posEscola].jogos.push(jogo);

                                            this._storage.set('setEscola', escolas[posEscola]);                                        
                                            return this._storage.set("escolas", escolas);
                                        });
                                }
                            });
                    });
    }
         
}
