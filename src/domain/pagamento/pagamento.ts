export class Pagamento {

    constructor(
        public aluno: string = '',
        public valor: string = '',
        public data: string = new Date().toISOString(),
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}