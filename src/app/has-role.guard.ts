import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  user = JSON.parse(atob((localStorage.getItem('token') || '{}').split('.')[1]));
  constructor(public router: Router)
     { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      const isAuthorized= this.user.role.includes(route.data['role']) || this.user.role == "admin";
      if (!isAuthorized){
        window.alert('ALERT : you are not authorized !!')
      }
       return isAuthorized;
  }
  
}
