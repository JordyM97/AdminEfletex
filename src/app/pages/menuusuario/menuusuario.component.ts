import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ClienteService } from 'src/app/services/cliente.service';
import {ProveedorService} from '../../services/proveedor.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-menuusuario',
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.css']
})
export class MenuusuarioComponent implements OnInit {
  color: ThemePalette = 'primary';
  proveedores:any=[]; //ARREGLO DE PROVEEDORES, ESTA SE COMUNICA CON EL HTML
  clientes:Array<any>;
  filtroUsuario='';
  fileName= 'ExcelSheetClientes.xlsx';

  constructor(
    private proveedorServicio:ProveedorService,
    private clienteServicio: ClienteService

  ) { 
    this.clientes = []
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  async obtenerClientes(){
    await this.clienteServicio.getClientes();
    this.clientes = await this.clienteServicio.getListaClientes();
    this.clientes.forEach(element => {
      console.log(element);
    });
  }

  cambiar(id:string){
    console.log("el id es "+id);
  }

  exportexcel(): void{
    /* table id is passed over here */   
    let element = document.getElementById('tabla-usuario'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  
}

}
