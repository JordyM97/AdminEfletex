import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Proveedor} from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
    API_URI='https://ctvehicular.pythonanywhere.com/api';
    API_URL='https://axela.pythonanywhere.com/api';
    proveedores: Array<any>;
    constructor(
    private http:HttpClient
  ) { }


  //Método para obtener todos los Clientes registrados
  getProveedores(){
    this.proveedores=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/driver/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        data.forEach(element => {
          this.proveedores.push(element.userDriver)
        });
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
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
