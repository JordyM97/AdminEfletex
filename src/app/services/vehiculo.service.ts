import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehiculo} from "../models/vehiculo";

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  API_URI='https://ctvehicular.pythonanywhere.com/api';

  constructor(
    private http:HttpClient
  ) { }

  //METODO PARA PEDIR AL BACKEND TODOS LOS PROVEEDORES REGISTRDOS
  obtenerVehiculos(){
    return this.http.get(`${this.API_URI}/vehicle/`);
  }

  //METODO PARA PEDIR AL BACKEND SOLO UN PROVEEDOR REGISTRADO
  obtenerVehiculo(id:String){
    return this.http.get(`${this.API_URI}/vehicle/${id}/`);
  }

  //METODO PARA ENVIAR UN PROVEEDOR AL BACKEND Y REGISTRARLO
  guardarVehiculo(vehiculo: Vehiculo){
    return this.http.post(`${this.API_URI}/vehicle/`,vehiculo);
  }

  //METODO PARA EDITAR EL ESTADO HABILITADO/INHABILITADO DE UN PROVEEDOR AL BACKEND Y REGISTRARLO
  editarVehiculo(id:string,vehiculo:any){
    return this.http.put(`${this.API_URI}/vehicle/${id}/`,vehiculo);
  }


}


/*

  //METODO PARA PEDIR AL BACKEND TODOS LOS PROVEEDORES REGISTRDOS
  getProveedores(){
    return this.http.get(`${this.API_URI}/driver/`);
  }

  //METODO PARA PEDIR AL BACKEND SOLO UN PROVEEDOR REGISTRADO
  getProveedor(id:String){
    return this.http.get(`${this.API_URI}/driver/${id}/`);
  }

  //METODO PARA ENVIAR UN PROVEEDOR AL BACKEND Y REGISTRARLO
  saveProveedor(proveedor: Proveedor){
    return this.http.post(`${this.API_URI}/driver/`,proveedor);
  }

  //METODO PARA EDITAR EL ESTADO HABILITADO/INHABILITADO DE UN PROVEEDOR AL BACKEND Y REGISTRARLO
  editEstadoProveedor(id:string,proveedor:any){
    return this.http.put(`${this.API_URI}/driver/${id}/`,proveedor);
  }

}
 */