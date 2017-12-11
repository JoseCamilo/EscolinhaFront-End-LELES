import { Aluno } from '../aluno/aluno';
import { Turma } from "../turma/turma";
import { Jogo } from "../jogo/jogo";
import { Cobranca } from "../cobranca/cobranca";

export class Escola {

    constructor(
        public nome: string = '', 
        public alunos: Aluno[] = [],
        public turmas: Turma[] = [],
        public jogos: Jogo[] = [],
        public cobrancas: Cobranca[] = [],
        public confirmado: boolean = false,
        public _id: string = null
    ) {}
}