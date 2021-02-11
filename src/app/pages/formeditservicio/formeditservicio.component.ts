import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Servicio} from '../../models/empresa';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-formeditservicio',
  templateUrl: './formeditservicio.component.html',
  styleUrls: ['./formeditservicio.component.css']
})
export class FormeditservicioComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicio:Servicio={
    nameTypeService:'',
    descriptionTypeService:''
  }

  constructor(
   public dialogRef:MatDialogRef<FormeditservicioComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _formBuilder: FormBuilder,
    private empresaService:EmpresaService) {
   }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      nameTypeService: [this.data.nameTypeService,Validators.required],
      descriptionTypeService: [this.data.descriptionTypeService,Validators.required]
    });
  }

  edit(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.servicio=this.firstFormGroup.value;
      this.empresaService.editServicio(this.servicio,this.data.id)
      .subscribe(
        value=>
        {
          alert("Tarifa creada");
        }
      );
    }
  }

}
