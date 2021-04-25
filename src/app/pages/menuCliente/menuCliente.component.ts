import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ClienteService } from 'src/app/services/cliente.service';
import {ProveedorService} from '../../services/proveedor.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-menuCliente',
  templateUrl: './menuCliente.component.html',
  styleUrls: ['./menuCliente.component.css']
})
export class MenuClienteComponent implements OnInit {
  color: ThemePalette = 'primary';
  proveedores:any=[]; //ARREGLO DE PROVEEDORES, ESTA SE COMUNICA CON EL HTML
  clientes:Array<any>;
  filtroUsuario='';
  estadoUsuario;
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
    let params: any = {}
    this.clienteServicio.getClientes(params).subscribe((data: any) =>{
      this.clientes = data
      console.log(this.clientes)
    })
  }

  cambiarEstado(estado,id) {
      console.log(estado, id);
      let cambioEstado = {
        is_active:!estado
      };
      this.clienteServicio.putCliente(id,cambioEstado).subscribe((data:any) =>{
        console.log(data)
      })
      setTimeout(() => {
        window.location.reload(); /*Para recargar la pagina*/
      }, 100);

      //this.clienteServicio.putCliente(id,cambioEstado)
      
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
