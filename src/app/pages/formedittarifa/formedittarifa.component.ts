import { Component,Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Tarifa} from '../../models/empresa';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formedittarifa',
  templateUrl: './formedittarifa.component.html',
  styleUrls: ['./formedittarifa.component.css']
})
export class FormedittarifaComponent implements OnInit {

  firstFormGroup: FormGroup;
  servicios:any=[];
  tarifa:Tarifa={
    nameFare:'',
    idTypeServiceFare:'',
    minFare:'',
    maxFare:'',
    priceFare:'',
    idCompanyFare:''
  }

  constructor(
    public dialogRef:MatDialogRef<FormedittarifaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private empresaService:EmpresaService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerServicios();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      nameFare: [this.data.nameFare,Validators.required],
      idTypeServiceFare: [this.data.idServicio,Validators.required],
      minFare:[this.data.minFare,Validators.required],
      maxFare:[this.data.maxFare,Validators.required],
      priceFare:[this.data.priceFare,Validators.required],
      idCompanyFare:1
    });
  };

  edit(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.tarifa=this.firstFormGroup.value;
      this.empresaService.editTarifa(this.tarifa,this.data.id)
      .subscribe(
        value=>
        {
          alert("Tarifa editada");
        }
      );
    }
  }

  obtenerServicios(){
    this.empresaService.getServicios().subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }

}
