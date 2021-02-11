import { Component, EventEmitter, Host, Output } from '@angular/core';
import {AuthService} from '../app/services/auth.service';
import {Admin} from '../app/models/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';

  contrasenia: string

  @Output() isLogout = new EventEmitter<void>();
  user:any;
  email:any;
  constructor(
    private firebaseService: AuthService
  ){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
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
  /*title = 'angular';
  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';

  contrasenia: string

  @Output() isLogout = new EventEmitter<void>();
  user:any;
  email:any;
  constructor(
    private firebaseService: AuthService
  ){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }

  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn){
    this.isSignedIn = true;
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
  }*/

