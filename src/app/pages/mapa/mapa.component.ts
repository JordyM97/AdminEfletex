import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '@angular/compiler';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  PositionD: Observable<any>;
  markerD=null;
  lat:any;
  lng:any;
  zoom: any;

  latVehicle: any;
  lngVehicle: any;

  constructor(
    public db: AngularFireDatabase,                       // no se si borrar todavia
    public firestore: AngularFirestore,                           // conector a firestore
    ) { 
      if (navigator){
          navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
          this.zoom = 14;
        });
      }
    }

  ngOnInit(): void {
    this.watchDriverPos(1);
  }

  watchDriverPos(id: any){
    this.PositionD= this.firestore.doc(`/posicion/${id}`).valueChanges()
    this.PositionD.subscribe(val=>{ 
      this.latVehicle = JSON.parse(val.location).lat
      this.lngVehicle = JSON.parse(val.location).lng
      console.log(this.latVehicle)
      })
  }

}
