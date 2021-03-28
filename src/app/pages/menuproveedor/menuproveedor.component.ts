import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import {FormproveedorComponent} from '../formproveedor/formproveedor.component';
import {ProveedorService} from '../../services/proveedor.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-menuproveedor',
  templateUrl: './menuproveedor.component.html',
  styleUrls: ['./menuproveedor.component.css']
})
export class MenuproveedorComponent implements OnInit {
  proveedores:Array<any>;
  isChecked = true;
  filtroUsuario='';
  fileName= 'ExcelSheetProveedores.xlsx';  

  constructor(
    private dialog: MatDialog,
    private proveedorServicio:ProveedorService
  ) { 
    this.proveedores = []
  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  async obtenerProveedores(){
    await this.proveedorServicio.getProveedores();
    this.proveedores = await this.proveedorServicio.getListaProveedores();
    this.proveedores.forEach(element => {
      console.log(element);
    });
  }
  
  openDialog() {
   // console.log('se abre el form dialog');
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='91%';
    dialogConfig.width='50%'
    const dialogRef =  this.dialog.open(FormproveedorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //this.obtenerProveedores();
    });
  }

  cambiar(id:string){
    console.log("el id es "+id);
  }

  exportexcel(): void{
      /* table id is passed over here */   
      let element = document.getElementById('tabla-proveedor'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    
  }

  /*obtenerProveedores(){
        //ESTE METODO SE DEBE LLAMAR SIEMPRE QUE SE REALICE ALGUN CAMBIO DE LA DATA DEL PROVEEDOR
    //Y SE LA QUIERE VER REFLEJADA EN PANTALLA SIN NECESIDAD DE TENER QUE REFRESCAR EL NAVEGADOR
   // LLAMAR AL BACKEND PARA QUE ENVIE LA LISTA DE LOS PROVEEDORES
    this.proveedorServicio.getProveedores().subscribe(
      res=>{this.proveedores=res},
      err=>console.log(err)
    )
  }*/
/*
  cambiar(id:string,event: MatSlideToggleChange){
    this.proveedorServicio.getProveedor(id).subscribe(
      res=>{
        this.proveedor=res;
        this.proveedor.stateDriver=event.checked;
        console.log(this.proveedor);
        this.proveedorServicio.editEstadoProveedor(id,this.proveedor).subscribe(
          res=>{
            console.log(res);
            this.obtenerProveedores();
          },
          err=>{
            console.error(err);
            this.obtenerProveedores();
          }
        );
      },
      err=>console.log(err)
    );
  }*/

}
