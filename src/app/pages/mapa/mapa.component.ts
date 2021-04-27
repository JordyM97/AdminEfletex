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
  PositionA: Observable<any[]>;
  positionAll: AngularFirestoreCollection<any>;
  markerD=null;
  lat:any;
  lng:any;
  zoom: any;


  latVehicle: any;
  lngVehicle: any;

  marcadores = []

  mapStyle = [
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        },
        {
          "weight": 1.5
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.education",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]; 

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
    this.positionAll= this.firestore.collection('posicion')
    this.PositionA = this.positionAll.valueChanges();
    this.PositionA.subscribe(values=>{ 
      values.forEach(value =>{
        value.location = JSON.parse(value.location)
        this.marcadores.push(value)
      })
      console.log(this.marcadores)
    })
    console.log(this.PositionA)
    this.watchDriverPos(6);
  }

  watchDriverPos(id: any){
    this.PositionD= this.firestore.doc(`/posicion/${id}`).valueChanges()
    this.PositionD.subscribe(val=>{ 
      this.latVehicle = JSON.parse(val.location).lat
      this.lngVehicle = JSON.parse(val.location).lng
      })
  }

}
