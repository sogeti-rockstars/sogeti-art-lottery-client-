import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/full',
    pathMatch: 'full',
  },
  {
    path: 'full',
    component: FullComponent,
    loadChildren: () =>
      import('./component/material.module').then(
        (m) => m.MaterialComponentsModule
      ),
  },
];
