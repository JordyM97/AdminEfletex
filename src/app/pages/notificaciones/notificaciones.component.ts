import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FirebaseServicioService } from 'src/app/services/firebase-servicio.service';
import { NotificacionEnviadaComponent } from '../notificacion-enviada/notificacion-enviada.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  formNotificaciones: FormGroup;

  filtroOpciones = [{
    descripcion: "Conductores",
    codigo: 0
  },
  {
    descripcion: "Clientes",
    codigo: 1
  }];

  opcionElegida: any = this.filtroOpciones[0]; 
  data: any = {}

  constructor(
    private _formBuilder: FormBuilder,
    private firebaseServicio:FirebaseServicioService,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.formNotificaciones = this._formBuilder.group({
      user:['',[Validators.required]],
      title:['',[Validators.required]],
      body:['',[Validators.required]],
      data: ['']
    });
  }

  opcionElegidaFin(opcionElegida) {
    this.opcionElegida = opcionElegida
    console.log(this.opcionElegida)
  }

  async uploadNotificacion(e)  {
    const file=e.target.files[0];
    const filePath=`notificaciones/noticia_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{
      this.data.urlImg = url
      console.log(url)
    });
  }

  enviarNotificacion(){

    let params: any = {}

    this.data.tipoNotificacion = 2

    console.log(this.data)
    this.formNotificaciones.get('data').setValue(JSON.stringify(this.data));

    var formData: any = new FormData();
    formData.append("user", this.formNotificaciones.get('user').value.codigo);
    formData.append("body", this.formNotificaciones.get('body').value);
    formData.append("title", this.formNotificaciones.get('title').value);
    formData.append("data", this.formNotificaciones.get('data').value);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    this.empresaService.postNotificaciones(formData).subscribe((data: any) =>{
      console.log(data)
      this.modalEnvioConfirmacion("Listo","La notificación ha sido enviado de manera exitosa")
    }, err =>{
      this.modalEnvioConfirmacion("Atención","Ha ocurrido un problema, intente de nuevo")
    })
    console.log(formData)
  }

  modalEnvioConfirmacion(titulo,mensaje){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(NotificacionEnviadaComponent,
      {
        width:'30%',
        data:{
          titulo: titulo,
          mensaje: mensaje 
        }
      },
    );
  }

}
