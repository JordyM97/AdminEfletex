import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotloginGuard implements CanActivate {
  
  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Dado el estado de la sesion de authenticacion, si es nulo permite el acceso(login) 
   * caso contrario redirige al home.
   * @param next 
   * @param state 
   * @returns tru en caso de que no haya una sesion y false si existe un usuario loggeado.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AFauth.authState.pipe(map(auth => {
      if(!this.authService.getIsLogged()){
        return true
      }else{
        this.router.navigate(['/dashboard'])
        return true
      }}));



      
  }
  
}
