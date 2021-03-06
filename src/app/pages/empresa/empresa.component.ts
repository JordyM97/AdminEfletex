import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import {FormservicioComponent} from '../formservicio/formservicio.component';
import {FormeditservicioComponent} from '../formeditservicio/formeditservicio.component';
import {FormtarifasComponent} from '../formtarifas/formtarifas.component';
import {FormedittarifaComponent} from '../formedittarifa/formedittarifa.component';
import {EmpresaService} from '../../services/empresa.service';
import { TipoServiciosService } from 'src/app/services/tipo-servicios.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  politica:any=[];
  edit:any=[];
  servicios:any=[];
  servicio:any=[];
  tarifas:any=[];
  tarifa:any=[];
  filtroServicio='';
  filtroTarifa='';
  typeService:any=[];
  tipoServicios:Array<any>;
  tarifaServicios:Array<any>;

  constructor(
    private empresaServicio:EmpresaService,
    private tipoServicioServicio:TipoServiciosService,
    private dialog: MatDialog,

  ) {
    this.tipoServicios = []
    this.tarifaServicios = []
   }

  ngOnInit(): void {
    this.cargarPolitica();
    this.obtenerTarifas();
    //this.obtenerTipoServicios();
    this.obtenerTarifaServicios();
  }

  /*async obtenerTipoServicios(){
    await this.empresaServicio.getTipoServicios();
    this.tipoServicios = await this.empresaServicio.getListaTipoServicios();
    this.tipoServicios.forEach(element => {
      console.log(element);
    });
  }*/

  async obtenerTarifaServicios(){
    await this.empresaServicio.getTarifaServicios();
    this.tarifaServicios = await this.empresaServicio.getListaTarifaServicios();
    this.tipoServicios.forEach(element => {
      console.log(element);
    });
    this.tarifaServicios.forEach(element => {
      console.log(element);
    });
  }

  cargarPolitica(){
    this.empresaServicio.getPolitica().subscribe(
      res=>{this.politica=res;
      },
      err=>{console.log(err)}
    );
  }

  editarPolitica(){
    this.empresaServicio.getPolitica().subscribe(
      res=>{
          this.edit=res;
          this.edit.descriptionPolice=this.politica.descriptionPolice;
          this.empresaServicio.editPolitica(this.edit).subscribe(
          res=>{console.log(res);
            alert("Política editada");
          this.cargarPolitica()},
          err=>{console.log(err)}
        )
      },
      err=>{
        console.log(err);
      }
    )
  }

  obtenerServicios(){
    this.empresaServicio.getServicios().subscribe(
      res=>{this.servicios=res},
        err=>console.log(err)
      )
  }

  eliminarServicio(id:string){
    if(confirm("¿Desea eliminar el servicio")){
      this.empresaServicio.deleteServicio(id).subscribe(
        res=>{
          this.obtenerServicios();
        },
        err=>console.log(err)
      );
    }
  }

  openFormServicio() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width='35%';
    const dialogRef =  this.dialog.open(FormservicioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      value => 
      this.obtenerServicios()
    );
  }

  editarFormServicio(tipoServicio:any) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='91%';
    dialogConfig.width='50%';
    const dialogRef =  this.dialog.open(FormeditservicioComponent,
      {
        width:'35%',
        data:{
          id:tipoServicio.idTypeService,
          nameTypeService:tipoServicio.nameTypeService,
          descriptionTypeService:tipoServicio.descriptionTypeService
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      value => {
      this.obtenerServicios();
      console.log(`Dialog result: ${value}`); // Pizza!
}
    );
  }

   openFormTarifa(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width='50%';
    const dialogRef =  this.dialog.open(FormtarifasComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      value => this.obtenerTarifas()
    );
  }

  obtenerTarifas(){
    this.empresaServicio.getTarifas().subscribe(
      res=>{this.tarifas=res},
        err=>console.log(err)
      )
  }

  eliminarTarifa(id:string){
    if(confirm("¿Desea eliminar la tarifa")){
      this.empresaServicio.deleteTarifa(id).subscribe(
        res=>{
          this.obtenerTarifas();
        },
        err=>console.log(err)
      );
    }
  }

  editarFormTarifa(tarifa:any) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='91%';
    const dialogRef =  this.dialog.open(FormedittarifaComponent,
      {
        width:'50%',
        data:{
          id:tarifa.idFare,
          nameFare:tarifa.nameFare,
          minFare:tarifa.minFare,
          maxFare:tarifa.maxFare,
          priceFare:tarifa.priceFare,
          idServicio:tarifa.idTypeServiceFare
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      value=>{
      this.obtenerTarifas();
      console.log(`Dialog result: ${value}`); // Pizza!
    }
    );
  };
  

  obtenerServicio(id:string){
    this.typeService(id);
    console.log("este es el servicio "+this.typeService);
  }

}
