import { Component, OnInit, Inject  } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Proveedor} from '../../models/proveedor';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import {EmpresaService} from '../../services/empresa.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-historialproveedor',
  templateUrl: './historialproveedor.component.html',
  styleUrls: ['./historialproveedor.component.css']
})
export class HistorialproveedorComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicios:any=[];
  servicio:any=[];
  filtroServicio='';
  proveedor:Proveedor={        
    idDriver:'',
    emailDriver:'',
    ciDriver:'',
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
  }
  constructor(
    public dialogRef:MatDialogRef<HistorialproveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private empresaServicio:EmpresaService) { }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerServicios(this.proveedor.idDriver);
  }
  
  obtenerServicios(id:string){
    this.empresaServicio.getServiceProvider(id).subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      idDriver: [this.data.idDriver,Validators.required],
      emailDriver: [this.data.emailDriver,Validators.required],
      ciDriver: [this.data.ciDriver,Validators.required],
      nameDriver: [this.data.nameDriver,Validators.required],
      lnameDriver: [this.data.lnameDriver,Validators.required],
      rateDriver: [this.data.rateDriver,Validators.required]
    });
  }

}
