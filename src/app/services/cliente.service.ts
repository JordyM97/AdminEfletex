import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API_URI='https://ApUSUARIO';
  API_URL='https://axela.pythonanywhere.com/api';
  clientes: Array<any>;
  cliente: any;
  URL_USER = 'user'
  URL_CLIENTE = 'client'

  constructor(
    private http:HttpClient,
    private authService: AuthService,
    private apiService: ApiService
  ) { }


  //Método para obtener todos los Clientes registrados
  getClientes(params) {
    return this.apiService.ApiCall(
      `${this.URL_CLIENTE}/`,
      "GET",
      params
    );
  }

  //METODO PARA PEDIR AL BACKEND SOLO UN CLIENTE REGISTRADO
  getCliente(params) {
    return this.apiService.ApiCall(
      `${this.URL_CLIENTE}/`,
      "GET",
      params
    );
  }

  //Método para habilitar/deshabilitar a un cliente
  putCliente(id,params){
    return this.apiService.ApiCall(
      `${this.URL_USER}/update/admin/${id}/`,
      "PUT",
      params
    );
  }

  /*Método para obtener la información de  los cliente registrados
  getClientesInformacion(id:any){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/user/${id}/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        this.clientes.push(data)
        console.log(data)
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }*/

  getListaClientes(){
    return this.clientes;
  }

  getInformacionCliente(){
    return this.cliente
  }

  //METODO PARA PEDIR AL BACKEND TODOS LOS USUARIOS REGISTRDOS
  getUsuaruios(){
    return this.http.get(`${this.API_URI}/getUsuario`);
  }

  //METODO PARA PEDIR AL BACKEND SOLO UN USUARIO REGISTRADO
  getUsuario(id:String){
    return this.http.get(`${this.API_URI}/getUsuario/${id}`);
  }

  //METODO PARA EDITAR EL ESTADO HABILITADO/INHABILITADO DE UN USUARIO AL BACKEND Y REGISTRARLO
  editEstadoUsuario(id:string,estadoEditado:Cliente){
    return this.http.put(`${this.API_URI}/usuario/${id}`,estadoEditado);
  }

}
