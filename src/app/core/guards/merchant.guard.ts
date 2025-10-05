import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.IsLoggedIn()) {
      const role = this.authService.getUserRole();
      if (role) {
        if (role === 'user') {
          return true;
        } else {
          this.router.navigate(['/admin']);
          return false;
        }
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }

    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
