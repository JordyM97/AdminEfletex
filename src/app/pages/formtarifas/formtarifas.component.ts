import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Tarifa} from '../../models/empresa';


@Component({
  selector: 'app-formtarifas',
  templateUrl: './formtarifas.component.html',
  styleUrls: ['./formtarifas.component.css']
})
export class FormtarifasComponent implements OnInit {
  firstFormGroup: FormGroup;
  typeService:any=[];
  servicios:any=[];
  tarifa:Tarifa={
    nameFare:'',
    idTypeServiceFare:'',
    nameService:'',
    minFare:'',
    maxFare:'',
    priceFare:'',
    idCompanyFare:''
  }

  constructor(
    private _formBuilder: FormBuilder,
    private empresaService:EmpresaService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerServicios();
  }

private buildForm(){
  this.firstFormGroup = this._formBuilder.group({
    nameFare: ['',Validators.required],
    idTypeServiceFare: ['',Validators.required],
    minFare:['',Validators.required],
    maxFare:['',Validators.required],
    priceFare:['',Validators.required],
    idCompanyFare:1
  });
};

  save(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.tarifa=this.firstFormGroup.value;
      this.empresaService.getServicio(this.tarifa.idTypeServiceFare).subscribe(
        res=>{
          this.typeService=res;
          this.tarifa.nameService=this.typeService.nameTypeService;
          this.empresaService.createTarifa(this.tarifa)
          .subscribe(
            value=>
              {console.log("valor"+ value);
              alert("Tarifa agregado");
              });
        }
      )
    }
  }

  obtenerServicios(){
    this.empresaService.getServicios().subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }
}
