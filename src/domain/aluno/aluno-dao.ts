import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NumeradorDao } from "../numerador/numerador-dao";
import { Aluno } from "./aluno";

@Injectable()
export class AlunoDao {

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

    save(aluno: Aluno) {
        return this._getIdEscola()
                    .then((idEscola) =>{
                        
                       return this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                
                                                                                                           
                                if(aluno._id){
                                    // marca como alterado
                                    aluno.confirmado = false;

                                    // salva aluno
                                    let pos2 = escolas[posEscola].alunos.map(function(e) { return e._id; });
                                    let posAluno = pos2.indexOf(aluno._id);
                                    escolas[posEscola].alunos[posAluno] = aluno;

                                    // salva aluno nas turmas da escola atual
                                    if (escolas[posEscola].turmas) {
                                        for (var index = 0; index < escolas[posEscola].turmas.length; index++) {
                                        
                                            let pos3 = escolas[posEscola].turmas[index].alunos.map(function(e) { return e._id; });
                                            let pos3Aluno = pos3.indexOf(aluno._id);
                                            escolas[posEscola].turmas[index].alunos[pos3Aluno] = aluno;
                                        }
                                    }
    
                                    // salva aluno nos jogos da escola atual                                    
                                    if (escolas[posEscola].jogos) {
                                        for (var index = 0; index < escolas[posEscola].jogos.length; index++) {
                                        
                                            let pos4 = escolas[posEscola].jogos[index].alunos.map(function(e) { return e._id; });
                                            let pos4Aluno = pos4.indexOf(aluno._id);
                                            escolas[posEscola].jogos[index].alunos[pos4Aluno] = aluno;
                                        }    
                                    }
                                    
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

    delete(aluno: Aluno) {
        return this._getIdEscola()
                    .then((idEscola) =>{

                        return this._getEscolas()
                            .then((dados) => {
                                let escolas = dados;
                                let pos = escolas.map(function(e) { return e._id; });
                                let posEscola = pos.indexOf(idEscola);
                                                                            
                                if(aluno._id){
                                    let pos2 = escolas[posEscola].alunos.map(function(e) { return e._id; });
                                    let posAluno = pos2.indexOf(aluno._id);
                                    //escolas[posEscola].alunos.splice(posAluno,1);
                                    escolas[posEscola].alunos[posAluno].deletado = true;
                                    escolas[posEscola].alunos[posAluno].confirmado = false;
                                    
                                    this._storage.set('setEscola', escolas[posEscola]);
                                    return this._storage.set("escolas", escolas);
                                }
                            });
                    });
    }
         
}
