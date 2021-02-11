import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Proveedor } from 'src/app/models/proveedor';
import {Vehiculo} from 'src/app/models/vehiculo';
import {ProveedorService} from '../../services/proveedor.service';
import {VehiculoService} from '../../services/vehiculo.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirebaseServicioService} from '../../services/firebase-servicio.service';
import { Observable } from 'rxjs';
import cars from '../../../assets/json/cars.json';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { PoliticasComponent } from 'src/app/modals/politicas/politicas.component';
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
  secondFormGroup: FormGroup;
  isLinear = true;
  public carsList:{marca: string; modelo: { value: string; }[];}[]=cars;

  porcentaje: Observable<number>;
  url:Observable<string>;
  proSave:any=[];
  proveedor:Proveedor={
    ciDriver:'',
    emailDriver:'',
    nameDriver:'',
    lnameDriver:'',
    birthdateDriver:'',
    sexDriver:'',
    addressDriver:'',
    phoneDriver:'',
    cipictureDriver:'',
    licenceDriver:'',
    rateDriver:0,
    stateDriver:false,
    activeDriver:false,
    userDriver:'',
    companyDriver:''
  };


  vehiculo:Vehiculo={
    idVehicle:'',
    plateVehicle:'',
    brandVehicle:'',
    modelVehicle:'',
    yearVehicle:'',
    colorVehicle:'',
    registrationVehicle:'',
    plpictureVehicle:'',
    pictureVehicle:'',
    typeServiceVehicle:'1',
    typeVehicle:'',
    userVehicle:'',
  }

  constructor(
    private _formBuilder: FormBuilder,
    private proveedorServicio: ProveedorService,
    private vehiculoServicio:VehiculoService,
    private firebaseServicio:FirebaseServicioService,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
   ) { }

   ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      emailDriver:['',[Validators.required, Validators.email]],
      ciDriver:['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      nameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      lnameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      birthdateDriver:['',Validators.required],
      sexDriver:['',Validators.required],
      addressDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      phoneDriver:['',[Validators.required, Validators.pattern( /^[0-9]{1,10}$/)]],
      cipictureDriver:['',Validators.required],
      licenceDriver:['',Validators.required],
      stateDriver:true,
      rateDriver:0,
      activeDriver:true,
      userDriver:'',
      companyDriver:''
    });
    this.secondFormGroup = this._formBuilder.group({
      plateVehicle:['',[Validators.required, Validators.pattern(/[A-Za-z]{3}[0-9]{4}$/)]],
      brandVehicle:['',Validators.required],
      modelVehicle:['',Validators.required],
      yearVehicle:['',[Validators.required, Validators.pattern( /^[1-2][0-9]{3}$/)]],
      colorVehicle:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,10}$/)]],
      plpictureVehicle:['',Validators.required],
      registrationVehicle:['',Validators.required],
      pictureVehicle:['',Validators.required],
      typeServiceVehicle:1,
      typeVehicle:['',Validators.required],
      userVehicle:'',
    });
  }


  guardarProveedor(){
    if(this.secondFormGroup.valid){
    this.proveedor=this.firstFormGroup.value;
    this.vehiculo=this.secondFormGroup.value;
    console.log(this.proveedor);
    console.log(this.vehiculo);
       this.proveedorServicio.saveProveedor(this.proveedor).subscribe(
          res=>{
            console.log(res);
            this.proSave=res;
            this.vehiculo.userVehicle=this.proSave.idDriver;
            this.vehiculoServicio.guardarVehiculo(this.vehiculo).subscribe(
            res=>{
              console.log(res);
            },
            err=>{
              console.log(err);
            }
          )
        },
          err=>{console.log(err)});
        alert("Datos guardados con éxito");
      
  }
  else{
    alert("Registro incompleto");
  }
}

   async uploadCedula(e) {
    const file=e.target.files[0];
    const filePath=`proveedores/cedula_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.firstFormGroup.patchValue({cipictureDriver:url})});
  }

  async uploadLicencia(e)  {
    const file=e.target.files[0];
    const filePath=`proveedores/licencia_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.firstFormGroup.patchValue({licenceDriver:url})});
  }

  async uploadPlaca(e)  {
    const file=e.target.files[0];
    const filePath=`vehiculo/placa_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.secondFormGroup.patchValue({plpictureVehicle:url})});
  }

  async uploadMatricula(e)  {
    const file=e.target.files[0];
    const filePath=`vehiculo/matricula_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.secondFormGroup.patchValue({registrationVehicle:url})});
  }

  async uploadVehiculo(e)  {
    const file=e.target.files[0];
    const filePath=`vehiculo/vehiculo_${e.target.files[0].name}`;
    const ref=this.storage.ref(filePath);
    const task=this.storage.upload(filePath,file);
    (await task).ref.getDownloadURL().then(url=>{this.secondFormGroup.patchValue({pictureVehicle:url})});
  }



  openDialogPoliticas(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width='70%';
    //dialogConfig.height='80%';
    
    this.dialog.open(PoliticasComponent, dialogConfig);
    
    
  }

}

