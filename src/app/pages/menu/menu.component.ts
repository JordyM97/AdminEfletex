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



}
