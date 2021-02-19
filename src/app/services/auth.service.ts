import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AdminUser } from '../models/admin-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfor: Observable<firebase.User>;
  public userApp: AdminUser;
  public currentUser:any;
  public user = new BehaviorSubject<any>(null);
  private nombreAdmin;
  private correoAdmin;

  isLogged = false
  constructor(public firebaseAuth : AngularFireAuth,
              private router: Router,
              public http: HttpClient) { 
    //this.getUserInformation();
    //this.getCurrentUser();
  }

  login(credentials){
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders(); 
        this.http.post('https://axela.pythonanywhere.com/api/rest-auth/', credentials, {headers: headers}) 
          .subscribe(res => {
          this.isLogged = true
          let data = JSON.parse(JSON.stringify(res));
          localStorage.setItem('nombreAdmin', data.first_name);
          localStorage.setItem('correoAdmin', data.email);
          console.log(data)
          this.user.next(credentials);
          localStorage.setItem('userData', credentials);
          this.router.navigate(['/dashboard'])
          resolve("ok");
          },(err) => {
          resolve("bad");
          });  });
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.user.next(null);
      return;
    }
      this.user.next(userData);
  }


  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
     this.isLogged = true
     localStorage.setItem('user',JSON.stringify(res.user))
     this.router.navigate(['/dashboard'])})
     .catch( err =>{
      alert(err);
    } )
  }

  logout(){
    this.isLogged=false;
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('nombreAdmin');
    localStorage.removeItem('correoAdmin');
    this.router.navigate(['/login']);
  }

  getUserInformation(){
    this.userInfor= this.firebaseAuth.user;

    this.userInfor.subscribe(
      user =>{
        console.log('Infor > ',user);
        this.userApp={
          uid:user.uid,
          email:user.email,
        
        }
      }
    );
  }

  getCurrentUser(){
    this.firebaseAuth.onAuthStateChanged(
      user => {
        console.log('Change: ',user);
        this.currentUser = user;
      }
    );
    return this.currentUser;
  }

  getIsLogged(){
    return this.isLogged;
  }

}

