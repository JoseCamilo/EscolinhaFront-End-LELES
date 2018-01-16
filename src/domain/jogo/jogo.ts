import { Aluno } from "../aluno/aluno";

export class Jogo {

    constructor(
        public title: string = '',
        public descricao: string = '',
        public data: string = new Date().toISOString(),
        public endereco: string = '',
        public alunos: Aluno[] = [],
        public confirmado: boolean = false,
        public deletado: boolean = false,
        public _id = ''
    ) {}
}