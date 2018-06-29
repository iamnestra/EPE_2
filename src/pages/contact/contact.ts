import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {ToastController} from  'ionic-angular';
import { UregisterPage } from '../uregister/uregister';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user : any;
  pass : any;

  constructor(public navCtrl: NavController,private toastCtrl: ToastController) {}

  validarUsuario(){
    if(this.user == "admin" && this.pass == "123"){
    let user = this.user;
    let pass = this.pass;
    this.navCtrl.push(UregisterPage,{
    usuario: user,
    clave: pass
    })
    }
    else{
    let toast_bad = this.toastCtrl.create({
    message: 'DATOS INGRESADOS INCORRECTOS',
    duration:2000,
    position: 'top'})
    toast_bad.present();
    }
    }

}
