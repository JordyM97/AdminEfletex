import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  API_URI='https://ApUSUARIO';
  API_URL='https://axela.pythonanywhere.com/api';
  servicios: Array<any>;

  constructor(
    private http:HttpClient,
  ) { }

  //Método para obtener todos los Clientes registrados
  getServicios(){
    this.servicios=[]
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'token '+String(localStorage.getItem("token")));
      this.http.get(`${this.API_URL}/service/`, {headers: headers}).subscribe(res => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data)
        data.forEach(element => {
          this.servicios.push(element)
        });
        resolve("ok");
        },(err) => {
        resolve("bad");
        });});
  }

  getListaServicios(){
    return this.servicios;
  }
}
