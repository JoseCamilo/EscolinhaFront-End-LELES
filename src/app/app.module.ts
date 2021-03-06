import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LiberacaoPage } from "../pages/liberacao/liberacao";
import { IonicStorageModule } from "@ionic/storage/dist";
import { EscolasPage } from "../pages/escolas/escolas";
import { AlunosPage } from "../pages/alunos/alunos";
import { TurmasPage } from "../pages/turmas/turmas";
import { JogosPage } from "../pages/jogos/jogos";
import { PagamentosPage } from "../pages/pagamentos/pagamentos";
import { AddAlunoPage } from "../pages/addAluno/addAluno";
import { CobrancasPage } from "../pages/cobrancas/cobrancas";
import { AddTurmaPage } from "../pages/addTurma/addTurma";
import { AddJogoPage } from "../pages/addJogo/addJogo";
import { AddCobrancaPage } from "../pages/addCobranca/addCobranca";
import { NumeradorDao } from "../domain/numerador/numerador-dao";
import { AlunoDao } from "../domain/aluno/aluno-dao";
import { EscolaDao } from "../domain/escola/escola-dao";
import { TurmaDao } from "../domain/turma/turma-dao";
import { CobrancaDao } from "../domain/cobranca/cobranca-dao";
import { JogoDao } from "../domain/jogo/jogo-dao";
import { AddAlunoTurmaPage } from "../pages/addAlunoTurma/addAlunoTurma";
import { AlunosTurmaPage } from "../pages/alunosTurma/alunosTurma";
import { AddAlunoJogoPage } from "../pages/addAlunoJogo/addAlunoJogo";
import { AlunosJogoPage } from "../pages/alunosJogo/alunosJogo";
import { WsEscolas } from "../providers/wsEscolas";
import { HttpModule } from "@angular/http";
import { PagamentoDao } from "../domain/pagamento/pagamento-dao";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LiberacaoPage,
    EscolasPage,
    AlunosPage,
    TurmasPage,
    JogosPage,
    PagamentosPage,
    CobrancasPage,
    AddAlunoPage,
    AddTurmaPage,
    AddJogoPage,
    AddCobrancaPage,
    AlunosTurmaPage,
    AddAlunoTurmaPage,
    AddAlunoJogoPage,
    AlunosJogoPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LiberacaoPage,
    EscolasPage,
    AlunosPage,
    TurmasPage,
    JogosPage,
    PagamentosPage,
    CobrancasPage,
    AddAlunoPage,
    AddTurmaPage,
    AddJogoPage,
    AddCobrancaPage,
    AlunosTurmaPage,
    AddAlunoTurmaPage,
    AddAlunoJogoPage,
    AlunosJogoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    DatePicker,
    NumeradorDao,
    AlunoDao,
    EscolaDao,
    TurmaDao,
    JogoDao,
    CobrancaDao,
    PagamentoDao,
    WsEscolas,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
