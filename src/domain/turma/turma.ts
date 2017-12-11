import { Aluno } from "../aluno/aluno";

export class Turma {

    constructor(
        public title: string = '',
        public alunos: Aluno[] = [], 
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}