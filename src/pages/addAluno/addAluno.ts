import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from "@ionic-native/date-picker";

@Component({
  selector: 'page-add-aluno',
  templateUrl: 'addAluno.html'
})
export class AddAlunoPage {

  aluno: Aluno = new Aluno();
  title: string;
  url: string = 'http://www.precision-spine.com/wp-content/uploads/2015/09/person-icon.png';

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              private storage: Storage, 
              private camera: Camera,
              public datePicker: DatePicker) {

    if (navParams.get('aluno')) {
      this.aluno = navParams.get('aluno') as Aluno;
    }
    
  }
  
  tiraFoto() {
      
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true, 
      correctOrientation: true
    }).then(url => {
      this.url = url;
    })
    .catch(err => console.log(err));
  }

  selecionaData() {

    this.datePicker.show({
      date: new Date(), 
      mode: 'date'
    })
    .then(data => this.aluno.nascimento = data.toISOString());

  }
}
