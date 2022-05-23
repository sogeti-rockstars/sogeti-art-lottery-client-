import { Routes } from '@angular/router';
import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { AssociationComponent } from '../pages/association/association.component';
import { CreateLotteryComponent } from '../pages/create-lottery/create-lottery.component';
import { LotteryStartComponent } from '../pages/lottery-start/lottery-start.component';
import { LotteryComponent } from '../pages/lottery/lottery.component';
import { MembersComponent } from '../pages/members/members.component';
import { WinnersComponent } from '../pages/winners/winners.component';

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
        path: 'applottery',
        component: LotteryComponent,
    },
    {
        path: 'winners',
        component: WinnersComponent,
    },
    {
        path: 'members',
        component: MembersComponent,
    },
    {
        path: 'lottery-start',
        component: LotteryStartComponent,
    },
    {
        path: 'create-lottery',
        component: CreateLotteryComponent,
    },
];
