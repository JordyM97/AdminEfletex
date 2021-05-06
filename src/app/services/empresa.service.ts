import { Injectable } from '@angular/core';
import {Empresa} from '../models/empresa';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  API_URI='https://ctvehicular.pythonanywhere.com/api';
  API_URI_SV = 'http://ctvehicular.pythonanywhere.com/api/history/service';
  API_URL='https://axela.pythonanywhere.com/api';

  URL_TIPO_SERVICIO = 'typeservice';
  URL_NOTIFICACION = 'notification';
  URL_SUGGESTION = 'suggestion';
  servicios: Array<any>;
  tipoServicio: Array<any>;
  tarifaServicio: Array<any>;

  constructor(
    private http:HttpClient,
    private apiService: ApiService
  ) { }

  //Método para obtener todos los tipos de servicios
  getTipoServicios(params) {
    return this.apiService.ApiCall(
      `${this.URL_TIPO_SERVICIO}/`,
      "GET",
      params
    );
  }

  postNotificaciones(data){
    return this.apiService.ApiCallMultiPart(
      `${this.URL_NOTIFICACION}/`,
      "POST",
      data
    );
  }

  getComentariosSugerencias(params){
    return this.apiService.ApiCall(
      `${this.URL_SUGGESTION}/`,
      "GET",
      params
    );
  }

  putComentariosSugerencias(idSolicitud,params){
    return this.apiService.ApiCall(
      `${this.URL_SUGGESTION}/${idSolicitud}/`,
      "PUT",
      params
    );
  }



  //Método para actualizar todos los tipos de servicios
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

  //Método para obtener todos los tipos de servicios
  getTarifaServicios(){
    this.tarifaServicio=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/fare/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        data.forEach(element => {
          this.tarifaServicio.push(element)
        });
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }

  getListaTipoServicios(){
    return this.tipoServicio;
  }

  getListaTarifaServicios(){
    return this.tarifaServicio;
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