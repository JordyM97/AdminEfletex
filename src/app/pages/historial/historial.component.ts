import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
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
  servicios:any=[];
  proveedores:any=[];
  servicio:any=[];
  filtroServicio='';
  filtroUsuario='';

  constructor(
    private empresaServicio:EmpresaService,
    private proveedorServicio:ProveedorService,
    private dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarClientes();
    this.cargarServicios();
  }

  cargarServicios(){
    this.empresaServicio.getServicios().subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }
  cargarProveedores(){
    this.proveedorServicio.getProveedores().subscribe(
    res=>{this.proveedores=res},
    err=>console.log(err)
  )

  }
  cargarClientes(){
    this.proveedorServicio.getProveedores().subscribe(
    res=>{this.proveedores=res},
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
          idDriver:proveedor.idDriver,
          emailDriver:proveedor.emailDriver,
          ciDriver:proveedor.ciDriver,
          nameDriver:proveedor.nameDriver,
          lnameDriver:proveedor.lnameDriver,
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
