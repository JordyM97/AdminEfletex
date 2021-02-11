import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI='https://ApUSUARIO';

  constructor(
    private http:HttpClient
  ) { }

  //METODO PARA PEDIR AL BACKEND TODOS LOS USUARIOS REGISTRDOS
  getUsuaruios(){
    return this.http.get(`${this.API_URI}/getUsuario`);
  }

  //METODO PARA PEDIR AL BACKEND SOLO UN USUARIO REGISTRADO
  getUsuario(id:String){
    return this.http.get(`${this.API_URI}/getUsuario/${id}`);
  }

  //METODO PARA EDITAR EL ESTADO HABILITADO/INHABILITADO DE UN USUARIO AL BACKEND Y REGISTRARLO
  editEstadoUsuario(id:string,estadoEditado:Usuario){
    return this.http.put(`${this.API_URI}/usuario/${id}`,estadoEditado);
  }

}
