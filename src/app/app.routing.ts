import { Routes } from '@angular/router';

import { SpinnerComponent } from './layouts/spinner/spinner.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/spinner',
    pathMatch: 'full',
  },
  {
    path: 'spinner',
    component: SpinnerComponent,
    loadChildren: () => import('./component/material.module').then((m) => m.MaterialComponentsModule),
    // children: MaterialRoutes,
  },
];
