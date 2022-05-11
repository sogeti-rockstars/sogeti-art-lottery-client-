import { Routes } from '@angular/router';

import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { SearchComponent } from './search/search.component';
import { AssociationComponent } from '../pages/association/association.component';
import { WinnersComponent } from '../pages/winners/winners.component';
import { ContestantsComponent } from '../pages/contestants/contestants.component';

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
    path: 'association',
    component: AssociationComponent,
  },
  {
    path: 'winners',
    component: WinnersComponent,
  },
  {
    path: 'contestants',
    component: ContestantsComponent,
  },
];
