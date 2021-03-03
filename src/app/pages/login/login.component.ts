import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuComponent: MenuComponent,
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('correo')!== null){
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

  async onLogin(email:string,password:string) {
    let credentials = {
      username: email,
      password: password,
    };
    this.authService.login(credentials).then((result) => {
      if (result == "ok") {
        this.isSignedIn = true;
        this.isSignin.emit(true);
        this.user=JSON.parse(localStorage.getItem('user'));
        //this.email=this.user.email;
      } else {
        alert("F");
        //this.presentToastFeedback();
      }
    });
  }
/*
  async onSignin(email:string,password:string){
    await this.authService.signin(email,password)
    if(this.authService.isLogged){
      this.isSignedIn = true;
      this.isSignin.emit(true);
      this.user=JSON.parse(localStorage.getItem('user'));
      //console.log('blabla',this.user);
      this.email=this.user.email;
      //console.log('correo'+email);
    }
  }*/


  logout(){
    this.isSignedIn=false;
    this.authService.logout();
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
