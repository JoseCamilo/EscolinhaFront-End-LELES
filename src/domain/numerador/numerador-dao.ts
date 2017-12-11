import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class NumeradorDao {

    constructor(private _storage: Storage) {}

    private salva(id: number) {
        return this._storage.set("numerador", id.toString());
    }

    getNum() {

        return this._storage
            .get("numerador")
            .then(dado => {
                if(dado){
                    return this.salva(+dado + 1);  
                }else{                    
                    return this.salva(1);
                }
                
            });
    }
}
