import { Routes } from '@angular/router';

import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { SearchComponent } from './search/search.component';
import { AssociationComponent } from '../pages/association/association.component';
import { WinnersComponent } from '../pages/winners/winners.component';
import { MembersComponent } from '../pages/members/members.component';
import { LotteryComponent } from '../pages/lottery/lottery.component';


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
    path: 'appmembers',
    component: MembersComponent,
  },
  {
    path: 'applottery',
    component: LotteryComponent
  },
   {
     path: 'winners',
     component: WinnersComponent,
   },
];
