export class Aluno {

    constructor(
        public nome: string = '',
        public telefone: string = '',
        public nascimento: string = new Date().toISOString(),
        public endereco: string = '',
        public rg: string = '',
        public avatar: string = 'http://www.precision-spine.com/wp-content/uploads/2015/09/person-icon.png',
        public confirmado: boolean = false,
        public _id = ''
    ) {}
}

export class AlunoChecked {

    constructor(
        public checked: boolean = false,
        public aluno: Aluno = new Aluno(),
    ) {}
}