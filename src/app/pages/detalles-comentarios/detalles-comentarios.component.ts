import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-detalles-comentarios',
  templateUrl: './detalles-comentarios.component.html',
  styleUrls: ['./detalles-comentarios.component.css']
})
export class DetallesComentariosComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
  }

  revisadoComentarioSugerencia(){
    let params: any = {}
    params.atendido = true;
    let idComSug = this.data.data.id;
    this.empresaService.putComentariosSugerencias(idComSug,params).subscribe((data: any) =>{
      console.log(data)
      this.dialogRef.close(this.data.estadoFiltro);
    })
  }

}
