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

@Component({
  selector: 'app-formproveedor',
  templateUrl: './formproveedor.component.html',
  styleUrls: ['./formproveedor.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class FormproveedorComponent implements OnInit {
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
    stateDriver:true,
    activeDriver:true,
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
   this.firebaseServicio.SignUp(this.proveedor.emailDriver,'adwri545')
    .then((value)=>{
      console.log("valor"+value);
      this.firebaseServicio.sendPasswordResetEmail(this.proveedor.emailDriver)
      .then(()=>{
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
        alert("Proveedor agregado");
      })
    })

    .catch((e)=>{
      alert(e);  
    })
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

  validarEdad(){
    var dateControl = (<HTMLInputElement>document.getElementById("myDate")).value;
    var age= new Date(dateControl);
    var time = Math.abs(Date.now() - age.valueOf());
    console.log("diferencia edad",time);
    var edad = Math.floor((time / (1000 * 3600 * 24))/365.25);
    console.log("la edad es ",edad);
    if(edad<18){
      this.firstFormGroup.controls['birthdateDriver'].setErrors({'incorrect':true});
    }
  }

  validarCedula(){
    console.log("lalalala");
    var cedulaProveedor = (<HTMLInputElement>document.getElementById("cedula")).value;
   console.log("cedula prov",cedulaProveedor);
   //var cedula:boolean = this.validate(cedulaProveedor);
    //console.log("validez documento",cedula);
  }
  if(cedula){
    this.firstFormGroup.controls['ciDriver'].setErrors({'incorrect':false});
  }

  validate(){
    var cedula = (<HTMLInputElement>document.getElementById("cedula")).value;
    if (cedula.length === 10) {
      const digitoRegion = cedula.substring(0, 2);
      if (digitoRegion >= String(0) && digitoRegion <= String(24)) {
        const ultimoDigito = Number(cedula.substring(9, 10));
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
        const sumaTotal = (pares + impares);
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
        const decena = (Number(primerDigitoSuma) + 1) * 10;
        let digitoValidador = decena - sumaTotal;
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
        if (digitoValidador === ultimoDigito) {
          this.firstFormGroup.controls['ciDriver'].setErrors({'incorrect':false});

        } else {
          this.firstFormGroup.controls['ciDriver'].setErrors({'incorrect':true});
        }
      } else {
        this.firstFormGroup.controls['ciDriver'].setErrors({'incorrect':true});
      }
    } else {
      this.firstFormGroup.controls['ciDriver'].setErrors({'incorrect':true});
    }
  }

}