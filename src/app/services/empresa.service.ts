import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empresa} from '../models/empresa';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  API_URI='https://ctvehicular.pythonanywhere.com/api';
  API_URI_SV = 'http://ctvehicular.pythonanywhere.com/api/history/service';

  constructor(
    private http:HttpClient
  ) { }

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