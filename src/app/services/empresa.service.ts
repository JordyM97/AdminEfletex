import { Injectable } from '@angular/core';
import {Empresa} from '../models/empresa';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  API_URI='https://ctvehicular.pythonanywhere.com/api';
  API_URI_SV = 'http://ctvehicular.pythonanywhere.com/api/history/service';
  API_URL='https://axela.pythonanywhere.com/api';
  servicios: Array<any>;
  tipoServicio: Array<any>;

  constructor(
    private http:HttpClient
  ) { }

  //Método para obtener todos los Clientes registrados
  getTipoServicios(){
    this.tipoServicio=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/typeservice/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        data.forEach(element => {
          this.tipoServicio.push(element)
        });
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }

  //Método para obtener todos los Clientes registrados
  putTipoServicios(informacionModificar, id){
    this.tipoServicio=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.put(`${this.API_URL}/typeservice/`+String(id)+'/', informacionModificar , {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }

  getListaTipoServicios(){
    return this.tipoServicio;
  }

  //METODO PARA PEDIR AL BACKEND LA POLITICA DE LA EMPRESA
  getPolitica(){
    const id=2;
    return this.http.get(`${this.API_URI}/police/${id}/`);
  }

   //METODO PARA EDITAR LA POLITICA DE LA EMPRESA
  editPolitica(politicaEditada:any){
    const id=2;
    return this.http.put(`${this.API_URI}/police/${id}/`,politicaEditada);
  }

  //METODOS PARA LAS TARIFAS DE LA EMPRESA
  getTarifas(){
    return this.http.get(`${this.API_URI}/fare/`);
  }

  getTarifa(id:number){
    return this.http.get(`${this.API_URI}/fare/${id}/`);
  }

  createTarifa(tarifa:any){
    return this.http.post(`${this.API_URI}/fare/`,tarifa);
  }

  editTarifa(tarifa:any, id:number){
    return this.http.put(`${this.API_URI}/fare/${id}/`,tarifa);
  }

  deleteTarifa(id:string){
    return this.http.delete(`${this.API_URI}/fare/${id}/`);
  }

  //METODOS PARA LAS SERVICIO DE LA EMPRESA
  getServicios(){
    return this.http.get(`${this.API_URI}/typeservice/`);
  }

  getServicio(id:string){
    return this.http.get(`${this.API_URI}/typeservice/${id}/`);
  }

  createServicio(servicio:any){
    return this.http.post(`${this.API_URI}/typeservice/`,servicio);
  }

  editServicio(servicio:any, id:number){
    return this.http.put(`${this.API_URI}/typeservice/${id}/`,servicio);
  }

  deleteServicio(id:string){
    return this.http.delete(`${this.API_URI}/typeservice/${id}/`);
  }

  getServiceProvider(id:string){
    return this.http.get(`${this.API_URI_SV}/provider/pk/?pk=${id}/`);
  }

  getServiceClient(id:string){
    return this.http.get(`${this.API_URI_SV}/client/pk/?pk=${id}/`);
  }

  getServicetype(id:string){
    return this.http.get(`${this.API_URI_SV}/typeService/type=${id}/`);
  }

}