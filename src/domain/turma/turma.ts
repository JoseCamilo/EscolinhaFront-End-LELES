import { Aluno } from "../aluno/aluno";

export class Turma {

    constructor(
        public title: string = '',
        public alunos: Aluno[] = null, 
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}