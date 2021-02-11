import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Empresa} from '../../models/empresa';

@Component({
  selector: 'app-formempresa',
  templateUrl: './formempresa.component.html',
  styleUrls: ['./formempresa.component.css']
})
export class FormempresaComponent implements OnInit {
  firstFormGroup: FormGroup;
  empresa:Empresa={
    ruc:'',
    nameCompany:'',
    direccion:'',
    telefono:'',
    correo:''
  }
  constructor(
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      ruc: ['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      nameCompany: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',[Validators.required, Validators.pattern( /^[0-9]{1,10}$/)]],
      correo: ['',[Validators.required, Validators.email]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.empresa=this.firstFormGroup.value;
      console.log(this.empresa);
      /*this.empresaService.createServicio(this.servicio)
      .subscribe(
        value=>
        {
          alert("Servicio agregado");
        }
      );*/
    }
  }

}
