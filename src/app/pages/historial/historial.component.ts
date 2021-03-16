import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import {EmpresaService} from '../../services/empresa.service';
import {ProveedorService} from '../../services/proveedor.service';
import {HistorialproveedorComponent} from '../historialproveedor/historialproveedor.component';
import {HistorialservicioComponent} from '../historialservicio/historialservicio.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  clientes:Array<any>;
  proveedores:Array<any>;
  servicios:any=[];
  filtroServicio='';
  filtroUsuario='';

  constructor(
    private empresaServicio:EmpresaService,
    private proveedorServicio:ProveedorService,
    private clienteServicio:ClienteService,
    private dialog: MatDialog,
  ) { 
    this.proveedores = []
    this.clientes = []
   }

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerClientes();
    this.cargarServicios();
  }

  async obtenerProveedores(){
    await this.proveedorServicio.getProveedores();
    this.proveedores = await this.proveedorServicio.getListaProveedores();
    this.proveedores.forEach(element => {
      console.log(element);
    });
    console.log(this.proveedores)
  }

  async obtenerClientes(){
    await this.clienteServicio.getClientes();
    this.clientes = await this.clienteServicio.getListaClientes();
    this.clientes.forEach(element => {
      console.log(element);
    });
  }

  cargarServicios(){
    this.empresaServicio.getServicios().subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }
  detalleProveedor(proveedor:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(HistorialproveedorComponent,
      {
        width:'100%',
        data:{
          idDriver:proveedor.id,
          emailDriver:proveedor.email,
          ciDriver:proveedor.cedula,
          nameDriver:proveedor.first_name,
          lnameDriver:proveedor.last_name,
          rateDriver:proveedor.rateDriver,          
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.cargarServicios();
    });
  }

  detalleServicio(servicio:any) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(HistorialservicioComponent,
      {
        width:'100%',
        data:{
          id:servicio.idTypeService,
          nameTypeService:servicio.nameTypeService,
          descriptionTypeService:servicio.descriptionTypeService
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.cargarServicios();
    });
  }

}
