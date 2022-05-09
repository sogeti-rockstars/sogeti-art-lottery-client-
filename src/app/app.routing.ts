import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/spinner',
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
  {
    path: 'spinner',
    component: SpinnerComponent,
    loadChildren: () =>
      import('./component/material.module').then(
        (m) => m.MaterialComponentsModule
      ),
  },
];
