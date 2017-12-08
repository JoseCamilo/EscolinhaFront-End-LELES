export class Jogo {

    constructor(
        public title: string = '',
        public descricao: string = '',
        public data: string = new Date().toISOString(),
        public endereco: string = '',
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}