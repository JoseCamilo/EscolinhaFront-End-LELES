import { Aluno } from '../aluno/aluno';
import { Turma } from "../turma/turma";
import { Jogo } from "../jogo/jogo";
import { Pagamento } from "../pagamento/pagamento";

export class Escola {

    constructor(
        public nome: string = '', 
        public alunos: Aluno[] = null,
        public turmas: Turma[] = null,
        public jogos: Jogo[] = null,
        public pagamentos: Pagamento[] = null,
        public confirmado: boolean = false
    ) {}
}