import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  API_URI='https://ApUSUARIO';
  API_URL='https://axela.pythonanywhere.com/api';
  servicios: Array<any>;

  constructor(
    private http:HttpClient,
    private apiService: ApiService,
  ) { }

  URL_SERVICE = 'service'

  //Método para obtener todos los Servicios registrados

  getServicios(params) {
    return this.apiService.ApiCall(
      `${this.URL_SERVICE}/`,
      "GET",
      params
    );
  }

  getListaServicios(){
    return this.servicios;
  }
}
