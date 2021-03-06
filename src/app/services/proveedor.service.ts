import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proveedor} from '../models/proveedor';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
    API_URI='https://ctvehicular.pythonanywhere.com/api';
    API_URL='https://axela.pythonanywhere.com/api';
    URL_CONDUCTOR = 'driver';
    URL_USER = 'user';
    URL_CONDUCTOR_PREREGISTRO = 'driverpendiente'

    proveedores: Array<any>;
    proveedor: any;

    constructor(
    private http:HttpClient,
    private apiService: ApiService
  ) { }

    //Método para obtener todos los Clientes registrados
    getProveedores(params) {
      return this.apiService.ApiCall(
        `${this.URL_CONDUCTOR}/`,
        "GET",
        params
      );
    }
  
    //METODO PARA PEDIR AL BACKEND SOLO UN CLIENTE REGISTRADO
    getProveedor(params) {
      return this.apiService.ApiCall(
        `${this.URL_CONDUCTOR}/`,
        "GET",
        params
      );
    }
  
    //Método para habilitar/deshabilitar a un cliente
    putProveedor(id,params){
      return this.apiService.ApiCall(
        `${this.URL_USER}/update/admin/${id}/`,
        "PUT",
        params
      );
    }

    //Método para obtener las solicitudes de pre registro de conductores
    getPreRegistroProveedor(params){
      return this.apiService.ApiCall(
        `${this.URL_CONDUCTOR_PREREGISTRO}/`,
        "GET",
        params
      );
    }

    //Método para enviar una solicitud de pre registro de un conductor
    postPreRegistroProveedor(params, data){
      return this.apiService.ApiCall(
        `${this.URL_CONDUCTOR_PREREGISTRO}/`,
        "POST",
        data,
        params
      );
    }

    //Método para enviar una solicitud de pre registro de un conductor
    putPreRegistroProveedor(idSolicitud,params){
      return this.apiService.ApiCall(
        `${this.URL_CONDUCTOR_PREREGISTRO}/${idSolicitud}/`,
        "PUT",
        params
      );
    }

  //Método para obtener la información de  los cliente registrados
  /*getDriversInformacion(id:any){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/user/${id}/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }*/

  getListaProveedores(){
    return this.proveedores;
  }

  getInformacionProveedor(){
    return this.proveedor;
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
