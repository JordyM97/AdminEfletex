import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/services/empresa.service';
import { DetallesComentariosComponent } from '../detalles-comentarios/detalles-comentarios.component';

@Component({
  selector: 'app-comentarios-sugerencias',
  templateUrl: './comentarios-sugerencias.component.html',
  styleUrls: ['./comentarios-sugerencias.component.css']
})
export class ComentariosSugerenciasComponent implements OnInit {

  listaComentarios = []
  listaSugerencias = []

  filtroSugerencias = [{
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
  }];

  opcionElegidaSugerencia: any = this.filtroSugerencias[0];
  opcionResetSugerencia: any = this.filtroSugerencias[0];

  filtrosComentarios = [{
    descripcion: "Nuevos",
    codigo: 1
  },
  {
    descripcion: "Revisados",
    codigo: 2
  },
  {
    descripcion: "Todos",
    codigo: 3
  }];

  opcionElegidaComentario: any = this.filtrosComentarios[0];
  opcionResetComentario: any = this.filtrosComentarios[0];

  constructor(
    private dialog: MatDialog,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.comentarios();
    this.sugerencias();
  }

  filtroComentarios(opcionElegida) {
    this.listaComentarios = []
    this.opcionResetComentario = opcionElegida

    if(opcionElegida.codigo == 1){
      let params: any = {}
      params.atendido = false;
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(element.tipo){
            this.listaComentarios.push(element)
          }
        });
      })

    }else if(opcionElegida.codigo == 2){
      let params: any = {}
      params.atendido = true;
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(element.tipo){
            this.listaComentarios.push(element)
          }
        });
      })
    } else{
      let params: any = {}
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(element.tipo){
            this.listaComentarios.push(element)
          }
        });
      })
    }
    console.log(opcionElegida);
  }

  comentarios(){
    let params: any = {}
    params.atendido = false;
    this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
      console.log(data)
      data.forEach(element => {
        if(element.tipo){
          this.listaComentarios.push(element)
        }
      });
    })
    console.log(this.listaComentarios)
  }

  detalleComentario(data){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(DetallesComentariosComponent,
      {
        disableClose: true,
        width:'50%',
        data: {
          data: data,
          estadoFiltro: this.opcionResetComentario
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.filtroComentarios(result);
    });
  }




  filtroSugerencia(opcionElegida) {
    this.listaSugerencias = []
    this.opcionResetSugerencia = opcionElegida

    if(opcionElegida.codigo == 1){
      let params: any = {}
      params.atendido = false;
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(!element.tipo){
            this.listaSugerencias.push(element)
          }
        });
      })

    }else if(opcionElegida.codigo == 2){
      let params: any = {}
      params.atendido = true;
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(!element.tipo){
            this.listaSugerencias.push(element)
          }
        });
      })
    } else{
      let params: any = {}
      this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
        console.log(data)
        data.forEach(element => {
          if(!element.tipo){
            this.listaSugerencias.push(element)
          }
        });
      })
    }
    console.log(opcionElegida);
  }

  sugerencias(){
    let params: any = {}
    params.atendido = false;
    this.empresaService.getComentariosSugerencias(params).subscribe((data: any) =>{
      console.log(data)
      data.forEach(element => {
        if(!element.tipo){
          this.listaSugerencias.push(element)
        }
      });
    })
    console.log(this.listaSugerencias)
  }

  detalleSugerencia(data){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
    const dialogRef =  this.dialog.open(DetallesComentariosComponent,
      {
        disableClose: true,
        width:'50%',
        data: {
          data: data,
          estadoFiltro: this.opcionResetSugerencia
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.filtroSugerencia(result);
    });
  }

}
