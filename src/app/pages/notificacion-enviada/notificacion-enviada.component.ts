import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificacion-enviada',
  templateUrl: './notificacion-enviada.component.html',
  styleUrls: ['./notificacion-enviada.component.css']
})
export class NotificacionEnviadaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

}
