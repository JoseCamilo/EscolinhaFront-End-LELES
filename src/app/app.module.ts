import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LiberacaoPage } from "../pages/liberacao/liberacao";
import { IonicStorageModule } from "@ionic/storage/dist";
import { EscolasPage } from "../pages/escolas/escolas";
import { AlunosPage } from "../pages/alunos/alunos";
import { TurmasPage } from "../pages/turmas/turmas";
import { JogosPage } from "../pages/jogos/jogos";
import { PagamentosPage } from "../pages/pagamentos/pagamentos";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LiberacaoPage,
    EscolasPage,
    AlunosPage,
    TurmasPage,
    JogosPage,
    PagamentosPage
  ],
  imports: [
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
    PagamentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
