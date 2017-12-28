import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Aluno } from "../../domain/aluno/aluno";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from "@ionic-native/date-picker";
import { AlunoDao } from "../../domain/aluno/aluno-dao";

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
              public datePicker: DatePicker,
              private _alunoDao: AlunoDao) {

    if (navParams.get('aluno')) {
      this.aluno = navParams.get('aluno') as Aluno;
    }
    
  }
  
  tiraFoto() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: true, 
      correctOrientation: true
    };

    this.camera.getPicture(options).then(url => {
      this.aluno.avatar = url;
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

  saveAluno(){
    this._alunoDao.save(this.aluno);
    this.navCtrl.pop();
  }

  deleteAluno(){
    this._alunoDao.delete(this.aluno);
    this.navCtrl.pop();
  }
}
