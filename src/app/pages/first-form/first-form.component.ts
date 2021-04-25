import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { first_register, Proveedor } from 'src/app/models/proveedor';
import {Vehiculo} from 'src/app/models/vehiculo';
import {ProveedorService} from '../../services/proveedor.service';
import {VehiculoService} from '../../services/vehiculo.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirebaseServicioService} from '../../services/firebase-servicio.service';
import { Observable } from 'rxjs';
import cars from '../../../assets/json/cars.json';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  isLinear = true;
  public carsList:{marca: string; modelo: { value: string; }[];}[]=cars;

  porcentaje: Observable<number>;
  url:Observable<string>;
  proSave:any=[];
  registro:first_register={
    nameDriver:'',
    lnameDriver:'',
    emailDriver:'',
    ciDriver:'',
    phoneDriver:'',
  };

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      lnameDriver:['',[Validators.required, Validators.pattern(/[A-Za-z]{1,32}$/)]],
      emailDriver:['',[Validators.required, Validators.email]],
      ciDriver:['',[Validators.required, Validators.pattern( /^[0-9]{10}$/)]],
      phoneDriver:['',[Validators.required, Validators.pattern( /^[0-9]{1,10}$/)]]
    });
  }

}
