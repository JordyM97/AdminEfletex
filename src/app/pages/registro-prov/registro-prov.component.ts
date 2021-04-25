import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { first_register, Proveedor } from 'src/app/models/proveedor';
import {Vehiculo} from 'src/app/models/vehiculo';
import {ProveedorService} from '../../services/proveedor.service';
import {VehiculoService} from '../../services/vehiculo.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirebaseServicioService} from '../../services/firebase-servicio.service';
import { Observable } from 'rxjs';
import cars from '../../../assets/json/cars.json';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalEnvioExitosoComponent } from '../modal-envio-exitoso/modal-envio-exitoso.component';
@Component({
  selector: 'app-registro-prov',
  templateUrl: './registro-prov.component.html',
  styleUrls: ['./registro-prov.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class RegistroProvComponent implements OnInit {
  firstFormGroup: FormGroup;
  isLinear = true;
  public carsList:{marca: string; modelo: { value: string; }[];}[]=cars;

  porcentaje: Observable<number>;
  url:Observable<string>;
  proSave:any=[];
  registro:first_register={
    nameDriver:'',
    lnameDriver:'',
    emailDriver:'',
    ciDriver:'',
    phoneDriver:'',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      lnameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      emailDriver:['',[Validators.required, Validators.email]],
      ciDriver:['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      phoneDriver:['',[Validators.required, Validators.pattern( /^[0-9]{1,10}$/)]]
    });
  }

  modalEnvioExitoso(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(ModalEnvioExitosoComponent,
      {
        width:'100%',
        data:{
          envio:"Se ha enviado con exito la solicitud"         
        }
        /* 
        idDriver:proveedor.id,
        emailDriver:proveedor.email,
        ciDriver:proveedor.cedula,
        nameDriver:proveedor.first_name,
        lnameDriver:proveedor.last_name,
        rateDriver:proveedor.rateDriver,   
        */
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

