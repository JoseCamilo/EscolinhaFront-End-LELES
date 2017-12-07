import { Component } from '@angular/core';

import { AlunosPage } from '../alunos/alunos';
import { TurmasPage } from "../turmas/turmas";
import { JogosPage } from "../jogos/jogos";
import { PagamentosPage } from "../pagamentos/pagamentos";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlunosPage;
  tab2Root = TurmasPage;
  tab3Root = JogosPage;
  tab4Root = PagamentosPage;

  constructor() {

  }
}
