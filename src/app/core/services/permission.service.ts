import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private authService: AuthService) { }

  hasPermission(module: string, action: string): boolean {
    const profile = this.authService.GetProfile();
    return profile?.data?.permissions?.[module]?.[action] === true;
  }

  canShowMenu(menuPermissions: { module: string, action: string }[]): boolean {
    return menuPermissions.some(perm => this.hasPermission(perm.module, perm.action));
  }
}
