import { Aluno } from "../aluno/aluno";

export class Pagamento {

    constructor(
        public aluno: Aluno = new Aluno(),
        public valor: string = '',
        public data: string = new Date().toISOString(),
        public pago: boolean = true,
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}