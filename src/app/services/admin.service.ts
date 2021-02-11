import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URI='https://ctvehicular.pythonanywhere.com/api';

  constructor(
    private http:HttpClient
  ) { }

  getEmpresas(){
    return this.http.get(`${this.API_URI}/company/`);
  }

  createEmpresa(empresa:any){
    return this.http.post(`${this.API_URI}/company/`,empresa);
  }

  getAdministradores(){
    return this.http.get(`${this.API_URI}/Manager/`);
  }

  createAdministrador(administrador:any){
    return this.http.post(`${this.API_URI}/Manager/`,administrador);
  }
}
