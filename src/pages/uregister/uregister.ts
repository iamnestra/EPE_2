import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

interface ToDo{
  
  producto: string;
  marca: string;
  precio: number;
  stock: number;
  id?: string;
}



@Component({
  selector: 'page-uregister',
  templateUrl: 'uregister.html',
})
export class UregisterPage {

  todoCollection: AngularFirestoreCollection<ToDo>;
  todo: ToDo[];

  constructor(public navCtrl: NavController,private asf: AngularFirestore, public alertCtrl: AlertController) {}

  ionViewDidEnter() {
    this.todoCollection = this.asf.collection('todo');
    this.todoCollection.snapshotChanges().subscribe(todoList => {
      this.todo = todoList.map(item =>{
        return{
          producto: item.payload.doc.data().producto,
          marca: item.payload.doc.data().marca,
          precio: item.payload.doc.data().precio,
          stock: item.payload.doc.data().stock,
          id: item.payload.doc.id
        }
      })
    })  
  }


newItem() {
let prompt = this.alertCtrl.create({
  title: 'Añadir Actividad',
  message: 'Ingresa la informacion solicitada',
    inputs : [{
      name: 'producto',
      placeholder: 'Producto'
    },{
      name: 'marca',
      placeholder: 'Marca'
    },{
      name: 'precio',
      placeholder: 'Precio'
    },{
      name: 'stock',
      placeholder: 'Stock'
    }],
  buttons: [{
      text: 'Cancelar'}, 
      {text: 'Guardar',
      handler: data => {this.addTask(data.producto,data.marca,data.precio,data.stock);}
}]
}).present();
} 

addTask(producto:string,marca:string,precio:number,stock:number){

  this.asf.collection('todo').add({producto,marca,precio,stock});
}


deleteItem(item: ToDo) {
this.asf.doc(`todo/${item.id}`).delete().then(() =>{
  console.log(`Tarea eliminada: "${item.id}"`);
}).catch(err =>{console.error(err);
})
}

}
