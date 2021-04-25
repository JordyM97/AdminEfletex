import { Component, OnInit, Inject  } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmpresaService} from '../../services/empresa.service';
import {Servicio} from '../../models/empresa';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ClienteService } from 'src/app/services/cliente.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-historialservicio',
  templateUrl: './historialservicio.component.html',
  styleUrls: ['./historialservicio.component.css']
})
export class HistorialservicioComponent implements OnInit {
  firstFormGroup: FormGroup;
  servicios:Array<any>;
  serviciosPorTipo: Array<any>;
  cliente: any;
  conductor: any;

  filtroServicio='';
  idServicio='';
  servicio:Servicio={    
    nameTypeService:'',
    descriptionTypeService:''
  }

  fileName= 'ExcelSheetServiciosCarro.xlsx'; 

  constructor(
   public dialogRef:MatDialogRef<HistorialservicioComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _formBuilder: FormBuilder,
    private empresaServicio:EmpresaService,
    private servicioServicio: ServiciosService,
    private proveedorServicio: ProveedorService,
    private clienteServicio: ClienteService
    ) {
      this.servicios = []
      this.serviciosPorTipo = []
   }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerServicios();
  }

  private buildForm(){
    this.firstFormGroup = this._formBuilder.group({
      idServicio:[this.data.id,Validators.required],
      nameTypeService: [this.data.nameTypeService,Validators.required],
      descriptionTypeService: [this.data.descriptionTypeService,Validators.required]
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

  obtenerServicios(){
    let params: any = {}
    params["idTypeService"] = this.data.id 
    this.servicioServicio.getServicios(params).subscribe((data: any) =>{
      console.log(data)
      this.serviciosPorTipo = data;
    })
  }
/*
  async obtenerServicios(){
    await this.servicioServicio.getServicios();
    this.servicios = await this.servicioServicio.getListaServicios();
    this.servicios.forEach(async element => {
      if(element.idTypeService.idTypeService == this.data.id){
        let datos = JSON.parse(JSON.stringify(element));
        await this.clienteServicio.getCliente(element.idClientService.userClient);
        this.cliente = this.clienteServicio.getInformacionCliente();
        datos.nombreCliente = this.cliente.first_name+" "+this.cliente.last_name;

        if(element.idDriverService != null){
          await this.proveedorServicio.getProveedor(element.idDriverService.userDriver);
          this.conductor = this.proveedorServicio.getInformacionProveedor();
          datos.nombreConductor = this.conductor.first_name+" "+this.conductor.last_name;
        } else{
          datos.nombreConductor = "Sin asignar";
        }
        this.serviciosPorTipo.push(datos);
      }
    });
  }*/
}
