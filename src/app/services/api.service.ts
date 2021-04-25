import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_API = 'https://axela.pythonanywhere.com/api/';

  constructor(private auth:AuthService, private http: HttpClient) { }

    public ApiCall(endpoint, method, data, data2=null) {
      const headers = new HttpHeaders({ "Content-Type": "application/json",  "Authorization": 'token '+String(localStorage.getItem("token"))});
      const headers2 = new HttpHeaders({'Content-Type':'multipart/form-data',  "Authorization": 'token '+String(localStorage.getItem("token"))});

      switch (method) {
          case "GET":
              return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
          case "POST":
              return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data2 });  
          case "PUT":
              return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
          case "PUTMULT":
              return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
          case "DELETE":
          return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
      }
    }
}
