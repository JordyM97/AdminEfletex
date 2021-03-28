import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { DetallesComentariosComponent } from '../detalles-comentarios/detalles-comentarios.component';

@Component({
  selector: 'app-comentarios-sugerencias',
  templateUrl: './comentarios-sugerencias.component.html',
  styleUrls: ['./comentarios-sugerencias.component.css']
})
export class ComentariosSugerenciasComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  detalleComentario(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(DetallesComentariosComponent,
      {
        width:'100%',
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
