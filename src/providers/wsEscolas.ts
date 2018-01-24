import { Escola } from './../domain/escola/escola';
import { EscolaDao } from './../domain/escola/escola-dao';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class WsEscolas {

    private url:string = 'http://172.16.93.227:3000/api/ambiente/';
    public headers = new Headers({ 'Content-Type': 'application/json' });


    constructor(public http: Http,
                private _escolaDao: EscolaDao) {
    }

    public reenviaEscolas(){
        return this._escolaDao.getEscolas()
                            .then((dados) => {
                                let escolas = dados;

                                escolas.forEach(element => {
                                    element.confirmado = true;

                                    element.alunos.forEach(element => {
                                        element.confirmado = true;
                                    });

                                    element.turmas.forEach(element => {
                                        element.confirmado = true;
                                        element.alunos.forEach(element => {
                                            element.confirmado = true;
                                        });
                                    });
                                    
                                    element.jogos.forEach(element => {
                                        element.confirmado = true;
                                        element.alunos.forEach(element => {
                                            element.confirmado = true;
                                        });
                                    });
                                    
                                    element.cobrancas.forEach(element => {
                                        element.confirmado = true;
                                        element.pagamentos.forEach(element => {
                                            element.aluno.confirmado = true;
                                            element.confirmado = true;
                                        });
                                    });
                                });

                                return this._escolaDao.setEscolas(escolas);
                            });
    }

//   public getAmbientes(idProduto: string) : Observable<Escola[]> {
//     return this.http.get(this.url + idProduto)
//       .map(res => res.json())
//       .map(
//         (ambientes) => {
//           let newAmbientes : Escola[] = [];
//           ambientes.forEach(
//             element => {
//               newAmbientes.push(element);
//             }
//           );
//         return newAmbientes;
//       });
//   }

//   public getAllAmbientes() : Observable<Ambiente[]> {
//     return this.http.get(this.url)
//       .map(res => res.json())
//       .map(
//         (ambientes) => {
//           let newAmbientes : Ambiente[] = [];
//           ambientes.forEach(
//             element => {
//               newAmbientes.push(element);
//             }
//           );
//         return newAmbientes;
//       });
//   }

//   public saveAmbiente(ambiente: Ambiente){

//     if(ambiente._id) {
//       return this.http.put(this.url, ambiente);
//     } else {
//       return this.http.post(this.url, ambiente);
//     }
//   }

//   public deleteAmbiente(id: string){
//     return this.http.delete(this.url + id);
//   }
}
