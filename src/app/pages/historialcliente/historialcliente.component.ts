import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-historialcliente',
  templateUrl: './historialcliente.component.html',
  styleUrls: ['./historialcliente.component.css']
})
export class HistorialclienteComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicios:any=[];
  servicio:any=[];
  filtroServicio='';
  fileName= 'ExcelSheetServiciosCarro.xlsx'; 
  
  proveedor:Cliente={        
    cedula: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    sexo: '',
    direccion: '',
    telefono: '',
  }
  constructor(
    public dialogRef:MatDialogRef<HistorialclienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private empresaServicio:EmpresaService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.buildForm();
    this.obtenerServicios();
  }
  
  obtenerServicios(){
    let params: any = {}
    params["idClientService"] = this.data.idClient
    this.serviciosService.getServicios(params).subscribe((data: any) =>{
      this.servicios = data;
      console.log(this.servicio)
    })
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      idCliente: [this.data.userClient.id,Validators.required],
      emailCliente: [this.data.userClient.email,Validators.required],
      cedulaCliente: [this.data.userClient.cedula,Validators.required],
      nombreCliente: [this.data.userClient.first_name,Validators.required],
      apelligoCliente: [this.data.userClient.last_name,Validators.required],
      calificacionCliente: [this.data.rating,Validators.required]
    });
  }

  exportexcel(): void{
    /* table id is passed over here */   
    let element = document.getElementById('tabla-servicios'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
