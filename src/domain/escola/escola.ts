import { Aluno } from '../aluno/aluno';

export class Escola {

    constructor(
        public nome: string = '', 
        public alunos: Aluno[] = null, 
        public confirmado: boolean = false
    ) {}
}