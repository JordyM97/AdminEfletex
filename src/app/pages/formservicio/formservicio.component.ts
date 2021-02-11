import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Servicio} from '../../models/empresa';

@Component({
  selector: 'app-formservicio',
  templateUrl: './formservicio.component.html',
  styleUrls: ['./formservicio.component.css']
})
export class FormservicioComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicio:Servicio={
    nameTypeService:'',
    descriptionTypeService:''
  }

  constructor(
   private _formBuilder: FormBuilder,
    private empresaService:EmpresaService) {
   }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      nameTypeService: ['',Validators.required],
      descriptionTypeService: ['',Validators.required]
    });
  }

  save(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.servicio=this.firstFormGroup.value;
      this.empresaService.createServicio(this.servicio)
      .subscribe(
        value=>
        {
          alert("Servicio agregado");
        }
      );
    }
  }


}
