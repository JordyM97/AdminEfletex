import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Admin} from '../../models/admin';

@Component({
  selector: 'app-formadmin',
  templateUrl: './formadmin.component.html',
  styleUrls: ['./formadmin.component.css']
})
export class FormadminComponent implements OnInit {
  firstFormGroup: FormGroup;
  admin:Admin={
    email:'',
    nombre:'',
    apellido:''
  }
  constructor(
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
    });
  }

  save(event: Event) {
    event.preventDefault();
    if(this.firstFormGroup.valid){
      this.admin=this.firstFormGroup.value;
      console.log(this.admin);
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
