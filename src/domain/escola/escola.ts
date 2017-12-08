import { Aluno } from '../aluno/aluno';
import { Turma } from "../turma/turma";
import { Jogo } from "../jogo/jogo";

export class Escola {

    constructor(
        public nome: string = '', 
        public alunos: Aluno[] = null,
        public turmas: Turma[] = null,
        public jogos: Jogo[] = null,
        public confirmado: boolean = false
    ) {}
}