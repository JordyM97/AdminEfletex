import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormproveedorComponent } from '../formproveedor/formproveedor.component';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  detallePeticion(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(FormproveedorComponent,
      {
        width:'50%',
        /*data:{
          emailUsuario:proveedor.id,
          fecha:proveedor.email,
          asunto:proveedor.cedula,       
        }*/
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.cargarServicios();
    });
  }

  cargarServicios(){
  }
}
