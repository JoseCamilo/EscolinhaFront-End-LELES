import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Aluno } from "./aluno";

@Injectable()
export class AlunoDao {

    constructor(private _storage: Storage,
                private _dao: NumeradorDao) {}

    private _getKey() {
        return this._dao.getNum();
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

    save(aluno: Aluno) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(aluno._id){
                                    let pos2 = escolas[posEscola].alunos.map(function(e) { return e._id; });
                                    let posAluno = pos2.indexOf(aluno._id);
                                    escolas[posEscola].alunos[posAluno] = aluno;

                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }else{
                                    this._getKey()
                                        .then((key) => {
                                            aluno._id = key;
                                            escolas[posEscola].alunos.push(aluno);

                                            this._storage.set('setEscola', escolas[posEscola]);                                        
                                            return this._storage.set("escolas", escolas);
                                        });
                                }
                            });
                    });
    }
         
}
