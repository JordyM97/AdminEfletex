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
  submitted = false;
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
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombresConductor:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      apellidosConductor:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      emailConductor:['',[Validators.required, Validators.email]],
      cedulaConductor:['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      celularConductor:['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get form() { return this.firstFormGroup.controls; }

  preRegistroConductor(){
    let params: any = {}
    let data = {}

    data["nombres"] = this.firstFormGroup.value.nombresConductor
    data["apellidos"] = this.firstFormGroup.value.apellidosConductor
    data["email"] = this.firstFormGroup.value.emailConductor
    data["cedula"] = this.firstFormGroup.value.cedulaConductor
    data["celular"] = this.firstFormGroup.value.celularConductor

    this.submitted = true;

    console.log(this.firstFormGroup)

    if(this.firstFormGroup.status == "VALID"){
      this.proveedorService.postPreRegistroProveedor(params,data).subscribe((data: any) =>{
        console.log(data)
        this.modalEnvioExitoso("La solicitud ha sido enviada de manera exitosa")
        this.firstFormGroup.reset();
        this.submitted = false;
      })
    } else{
      this.modalEnvioExitoso("Solicitud inválida, revise los datos ingresados")
    }
  }

  modalEnvioExitoso(mensajeMostrar){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='60%';
    const dialogRef =  this.dialog.open(ModalEnvioExitosoComponent,
      {
        width:'40%',
        data:{
          mensajeMostrar: mensajeMostrar       
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

