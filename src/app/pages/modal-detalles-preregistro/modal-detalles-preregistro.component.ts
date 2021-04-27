import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-modal-detalles-preregistro',
  templateUrl: './modal-detalles-preregistro.component.html',
  styleUrls: ['./modal-detalles-preregistro.component.css']
})
export class ModalDetallesPreregistroComponent implements OnInit {

  firstFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _formBuilder: FormBuilder,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.firstFormGroup = this._formBuilder.group({
      email: [this.data.data.email,Validators.required],
      cedula: [this.data.data.cedula,Validators.required],
      celular: [this.data.data.celular,Validators.required],
    });
  }

  preRegistroRevisado(){
    let params: any = {}
    params.estado = true;
    let idPreRegistro = this.data.data.id;
    this.dialogRef.close(this.data.estadoFiltro);
    this.proveedorService.putPreRegistroProveedor(idPreRegistro,params).subscribe((data: any) =>{
      console.log(data)
      this.dialogRef.close(this.data);
    })
  }
}
