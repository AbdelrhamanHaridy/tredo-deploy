import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customers/customers.component').then(
        (c) => c.CustomersComponent
      ),
    children: [
      {
        path: ':id',
        outlet: 'customer',
        loadComponent: () =>
          import('./components/view-customer/view-customer.component').then(
            (c) => c.ViewCustomerComponent
          ),
      },
    ],
  },
];
