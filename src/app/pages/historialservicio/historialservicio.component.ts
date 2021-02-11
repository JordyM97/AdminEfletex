import { Component, OnInit, Inject  } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Servicio} from '../../models/empresa';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historialservicio',
  templateUrl: './historialservicio.component.html',
  styleUrls: ['./historialservicio.component.css']
})
export class HistorialservicioComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicios:any=[];
  filtroServicio='';
  idServicio='';
  servicio:Servicio={    
    nameTypeService:'',
    descriptionTypeService:''
  }

  constructor(
   public dialogRef:MatDialogRef<HistorialservicioComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _formBuilder: FormBuilder,
    private empresaServicio:EmpresaService) {
   }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerServicios(this.idServicio)
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      idServicio:[this.data.id,Validators.required],
      nameTypeService: [this.data.nameTypeService,Validators.required],
      descriptionTypeService: [this.data.descriptionTypeService,Validators.required]
    });
  }

  obtenerServicios(id:string){
    this.empresaServicio.getServicetype(id).subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }
}
