import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { FormproveedorComponent } from '../formproveedor/formproveedor.component';
import { ModalDetallesPreregistroComponent } from '../modal-detalles-preregistro/modal-detalles-preregistro.component';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {

  listaSolicitudesPreRegistro = []

  filtrosBusqueda = [{
      descripcion: "Nuevas",
      codigo: 1
    },
    {
      descripcion: "Revisadas",
      codigo: 2
    },
    {
      descripcion: "Todas",
      codigo: 3
    }
  ];

  opcionElegida: any = this.filtrosBusqueda[0];
  opcionReset: any = this.filtrosBusqueda[0];

  constructor(
    private dialog: MatDialog,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.solicitudesPreRegistro();
  }

  filtroSolicitudesPreRegistro(opcionElegida) {
    this.opcionReset = opcionElegida

    if(opcionElegida.codigo == 1){
      let params: any = {}
      params.estado = false;
      this.proveedorService.getPreRegistroProveedor(params).subscribe((data: any) =>{
        console.log(data)
        this.listaSolicitudesPreRegistro = data
      })
    }else if(opcionElegida.codigo == 2){
      let params: any = {}
      params.estado = true;
      this.proveedorService.getPreRegistroProveedor(params).subscribe((data: any) =>{
        console.log(data)
        this.listaSolicitudesPreRegistro = data
      })
    } else{
      let params: any = {}
      this.proveedorService.getPreRegistroProveedor(params).subscribe((data: any) =>{
        console.log(data)
        this.listaSolicitudesPreRegistro = data
      })
    }
    console.log(opcionElegida);
  }

  solicitudesPreRegistro(){
    let params: any = {}
    params.estado = false;
    this.proveedorService.getPreRegistroProveedor(params).subscribe((data: any) =>{
      console.log(data)
      this.listaSolicitudesPreRegistro = data
    })
    console.log(this.listaSolicitudesPreRegistro)
  }

  detallePeticion(data){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(ModalDetallesPreregistroComponent,
      {
        disableClose: true,
        width:'50%',
        data: {
          data: data,
          estadoFiltro: this.opcionReset
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.filtroSolicitudesPreRegistro(result);
    });
  }
}
