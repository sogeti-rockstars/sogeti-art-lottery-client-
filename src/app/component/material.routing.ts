import { RouterLinkWithHref, Routes } from '@angular/router';
import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { AssociationComponent } from '../pages/association/association.component';
import { CreateLotteryComponent } from '../pages/create-lottery/create-lottery.component';
import { LotteryStartComponent } from '../pages/lottery-start/lottery-start.component';
import { MembersComponent } from '../pages/members/members.component';
import { WinnersComponent } from '../pages/winners/winners.component';
import { ContestantRowComponent } from './contestant-row/contestant-row.component';
import { ContestantsComponent } from './contestants/contestants.component';

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
    path: 'lottery-start',
    component: LotteryStartComponent,
  },
  {
    path: 'winners',
    component: WinnersComponent,
  },
  {
    path: 'appmembers',
    component: MembersComponent,
  },
  {
    path: 'create-lottery',
    component: CreateLotteryComponent,
  },
];
