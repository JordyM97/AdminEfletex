import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular';
  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';

  contrasenia: string
  @Output() isLogout = new EventEmitter<void>();
  @Output() isSignin = new EventEmitter<boolean>();
  user:any;
  email:any;

  constructor(private firebaseService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!== null){
    this.isSignedIn= true
    this.isSignin.emit(true);
  }else{
    this.isSignedIn = false
    this.isSignin.emit(false);
  }
    
  }
  signIn(){
    console.log("inicio sesion");
  }

  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn){
    this.isSignedIn = true;
    this.isSignin.emit(true);
    this.user=JSON.parse(localStorage.getItem('user'));
    //console.log('blabla',this.user);
    this.email=this.user.email;
    //console.log('correo'+email);
  }
  }


  logout(){
    this.isSignedIn=false;
    this.firebaseService.logout();
    this.isLogout.emit();
  }

  iconPassword(){
    this.showPassword=!this.showPassword;
    if(this.passwordIcon=='eye'){
      this.passwordIcon='eye-off';
    }
    else{
      this.passwordIcon='eye';
    }
  }
}
