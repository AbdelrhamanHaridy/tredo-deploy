import { Routes } from '@angular/router';

export const WAREHOUSE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/warehouses/warehouses.component').then(
        (c) => c.WarehousesComponent
      ),
    children: [
      {
        path: ':id',
        outlet: 'warehouse',
        loadComponent: () =>
          import('./components/view-warehouse/view-warehouse.component').then(
            (c) => c.ViewWarehouseComponent
          ),
      },
    ],
  },
];