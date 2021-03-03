import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ClienteService } from 'src/app/services/cliente.service';
import {ProveedorService} from '../../services/proveedor.service';

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
  constructor(
    private proveedorServicio:ProveedorService,
    private clienteServicio: ClienteService

  ) { 
    this.clientes = []
  }

  ngOnInit(): void {
    //this.obtenerUsuarios();
    this.obtenerClientes();
  }

  async obtenerClientes(){
    await this.clienteServicio.getClientes();
    this.clientes = await this.clienteServicio.getListaClientes();
    this.clientes.forEach(element => {
      console.log(element);
      console.log("FFF");
    });
    console.log(this.clientes)
  }

  obtenerUsuarios(){
    //ESTE METODO SE DEBE LLAMAR SIEMPRE QUE SE REALICE ALGUN CAMBIO DE LA DATA DEL PROVEEDOR
    //Y SE LA QUIERE VER REFLEJADA EN PANTALLA SIN NECESIDAD DE TENER QUE REFRESCAR EL NAVEGADOR
    // LLAMAR AL BACKEND PARA QUE ENVIE LA LISTA DE LOS PROVEEDORES
    this.proveedorServicio.getProveedores().subscribe(
    res=>{this.proveedores=res 
      console.log(res)},
    err=>console.log(err)
    )
  }

  cambiar(id:string){
    console.log("el id es "+id);
  }

}
