import { Component, OnInit } from '@angular/core';
import {EmpresaService} from '../../services/empresa.service';


@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {
  politica:any=[];

  constructor(
    private empresaServicio:EmpresaService,
    
  ) { }

  ngOnInit(): void {
    this.cargarPolitica();
  }

  cargarPolitica(){
    this.empresaServicio.getPolitica().subscribe(
      res=>{this.politica=res;
      },
      err=>{console.log(err)}
    );
  }

 
 
 

}
