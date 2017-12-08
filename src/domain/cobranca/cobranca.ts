export class Cobranca {

    constructor(
        public title: string = '',
        public descricao: string = '',
        public data: string = new Date().toISOString(),
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}