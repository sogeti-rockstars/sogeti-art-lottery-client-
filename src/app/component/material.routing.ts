import { Routes } from '@angular/router';

import { ArtItemsComponent } from './art-items/art-items.component';
import { SearchComponent } from './search/search.component';
import { AssociationComponent } from './association/association.component';
import { SpinnerComponent } from '../layouts/spinner/spinner.component';

export const MaterialRoutes: Routes = [
  {
    path: '',
    redirectTo: 'artitems',
    pathMatch: 'full',
  },
  {
    path: 'artitems',
    component: ArtItemsComponent,
  },
  {
    path: 'appsearch',
    component: SearchComponent,
  },
  {
    path: 'association',
    component: AssociationComponent,
  },
  // {
  //   path: 'spinner',
  //   component: SpinnerComponent,
  // },
];
