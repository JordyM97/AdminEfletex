import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import {FormempresaComponent} from '../formempresa/formempresa.component';
import {FormadminComponent} from '../formadmin/formadmin.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }


  openFormEmpresa() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='70%';
    dialogConfig.width='40%';
    const dialogRef =  this.dialog.open(FormempresaComponent, dialogConfig);
  }

  
  openFormAdministrador() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.height='52%';
    dialogConfig.width='40%';
    const dialogRef =  this.dialog.open(FormadminComponent, dialogConfig);
  }


}
