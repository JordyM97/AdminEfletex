import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProveedorService} from '../../services/proveedor.service';

@Component({
  selector: 'app-menuusuario',
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.css']
})
export class MenuusuarioComponent implements OnInit {
  color: ThemePalette = 'primary';
  proveedores:any=[]; //ARREGLO DE PROVEEDORES, ESTA SE COMUNICA CON EL HTML
  filtroUsuario='';
  constructor(
    private proveedorServicio:ProveedorService

  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    //ESTE METODO SE DEBE LLAMAR SIEMPRE QUE SE REALICE ALGUN CAMBIO DE LA DATA DEL PROVEEDOR
    //Y SE LA QUIERE VER REFLEJADA EN PANTALLA SIN NECESIDAD DE TENER QUE REFRESCAR EL NAVEGADOR
    // LLAMAR AL BACKEND PARA QUE ENVIE LA LISTA DE LOS PROVEEDORES
    this.proveedorServicio.getProveedores().subscribe(
    res=>{this.proveedores=res},
    err=>console.log(err)
    )
  }

  cambiar(id:string){
    console.log("el id es "+id);
  }

}
