
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { map, take } from 'rxjs/operators'
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private authService: AuthService) {

  }
  
  /**
   * Dado el estado de la sesion de authentication si es nulo, redirige al login
   * y si hay una sesion activa(loggeado) permite acceder al home (true).
   * @param next 
   * @param state 
   * @returns true si tiene acceso a la pantalla (home), falso caso contrario.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.autoLogin();
      return this.authService.user.pipe(take(1), map(user => {
        const isAuth = !!user;
            if (isAuth) {
                return true;
            } else {
              this.router.navigate(['/login'])
              return false;
            }
      }));
  }
  
}
