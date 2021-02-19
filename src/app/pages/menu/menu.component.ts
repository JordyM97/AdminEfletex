import { Component, EventEmitter, Output} from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  title = 'angular';
  isSignedIn = false;
  showPassword=false;
  passwordIcon='eye';
  nombreAdmin= 'defecto';
  correoAdmin= 'defecto';

  contrasenia: string

  @Output() isLogout = new EventEmitter<void>();
  user:any;
  email:any;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.nombreAdmin = localStorage.getItem('nombreAdmin');
    this.correoAdmin = localStorage.getItem('correoAdmin');
    console.log(this.nombreAdmin)
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }
  logout(){
    this.isSignedIn=false;
    this.authService.logout();
    this.isLogout.emit();
    
  }



}
