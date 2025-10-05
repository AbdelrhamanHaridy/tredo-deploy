import { Routes } from '@angular/router';

export const MERCHANTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./merchants.component').then((m) => m.MerchantsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'warehouses',
        loadChildren: () =>
          import('./warehouse/warehouse.routes').then(
            (m) => m.WAREHOUSE_ROUTES
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.routes').then(
            (m) => m.CUSTOMERS_ROUTES
          ),
      },
      /* {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics.component')
          .then(m => m.AnalyticsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports.component')
          .then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component')
          .then(m => m.SettingsComponent)
      } */
    ],
  },
];
