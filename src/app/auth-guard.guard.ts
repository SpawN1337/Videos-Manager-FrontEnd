import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      const isexpired = this.isExpiredToken(token)
      if (!isexpired) {
        return true
      } else {
        this.router.navigate(['/login'])
        return false;
      }
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }

  isExpiredToken(token: any): boolean {
    const decoded:any=jwt_decode(token);
    return Math.floor(new Date().getTime()/1000)>=decoded.exp
  }
}



