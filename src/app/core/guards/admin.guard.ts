import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable, take, switchMap, of, catchError } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.profile$.pipe(
      take(1),
      switchMap(profile => {
        if (!profile) {
          this.router.navigate(['/auth/login']);
          return of(false);
        }

        return this.authService.GetAllRoles().pipe(
          map((response: any) => {
            // تحقق من أن الاستجابة تحتوي على مصفوفة الأدوار
            const rolesArray = response.data || response || [];
            const allowedRoles = Array.isArray(rolesArray) ?
              rolesArray.map((role: any) => role.role) : [];

            if (allowedRoles.includes(profile.data.role)) {
              return true;
            } else {
              if (profile.data.role === 'user') {
                this.router.navigate(['/merchents']);
              } else {
                this.router.navigate(['/']);
              }
              return false;
            }
          }),
          catchError(() => {
            this.router.navigate(['/']);
            return of(false);
          })
        );
      })
    );
  }
}
