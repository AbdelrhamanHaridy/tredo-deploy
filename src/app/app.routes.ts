import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    canActivate: [authGuard],
    path: 'merchants',
    loadChildren: () => import('./modules/merchants/merchants.routes').then(m => m.MERCHANTS_ROUTES)
  },
  {
    canActivate: [loginGuard],
    path: '',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
];
