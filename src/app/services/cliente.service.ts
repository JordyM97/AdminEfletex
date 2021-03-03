import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API_URI='https://ApUSUARIO';
  API_URL='https://axela.pythonanywhere.com/api';
  clientes: Array<any>;

  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { }


  //Método para obtener todos los Clientes registrados
  getClientes(){
    this.clientes=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/client/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        data.forEach(element => {
          console.log(element.userClient)
          this.clientes.push(element.userClient)
        });
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
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
    console.log(this.clientes.values())
    return this.clientes;
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
