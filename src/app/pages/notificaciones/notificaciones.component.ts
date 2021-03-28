import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseServicioService } from 'src/app/services/firebase-servicio.service';
import { NotificacionEnviadaComponent } from '../notificacion-enviada/notificacion-enviada.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  formNotificaciones: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private firebaseServicio:FirebaseServicioService,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formNotificaciones = this._formBuilder.group({
      destinatarioNotificacion:['',Validators.required],
      tituloNotificacion:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      descripcionNotificacion:['',Validators.required]
    });
  }

  async uploadNotificacion(e)  {
    const file=e.target.files[0];
    const filePath=`proveedores/licencia_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.formNotificaciones.patchValue({licenceDriver:url})});
  }

  async enviarNotificacion(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(NotificacionEnviadaComponent,
      {
        width:'30%'
      }
    );
  }

}
