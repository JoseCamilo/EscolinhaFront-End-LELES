import { Pagamento } from "../pagamento/pagamento";

export class Cobranca {

    constructor(
        public title: string = '',
        public descricao: string = '',
        public data: string = new Date().toISOString(),
        public valor: string = '',
        public pagamentos: Pagamento[] = [],
        public confirmado: boolean = false,
        public deletado: boolean = false,
        public _id = ''
    ) {}
}