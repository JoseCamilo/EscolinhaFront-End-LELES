import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Aluno } from "../aluno/aluno";
import { Turma } from "./turma";

@Injectable()
export class TurmaDao {

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

    save(turma: Turma) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(turma._id){
                                    let pos2 = escolas[posEscola].turmas.map(function(e) { return e._id; });
                                    let posTurma = pos2.indexOf(turma._id);
                                    escolas[posEscola].turmas[posTurma] = turma;

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }else{
                                    this._getKey()
                                        .then((key) => {
                                            turma._id = key;
                                            escolas[posEscola].turmas.push(turma);

                                            this._storage.set('setEscola', escolas[posEscola]);                                        
                                            return this._storage.set("escolas", escolas);
                                        });
                                }
                            });
                    });
    }

    delete(turma: Turma) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(turma._id){
                                    let pos2 = escolas[posEscola].turmas.map(function(e) { return e._id; });
                                    let posTurma = pos2.indexOf(turma._id);
                                    escolas[posEscola].turmas.splice(posTurma, 1);

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }
                            });
                    });
    }
         
}
