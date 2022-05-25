import { Routes } from '@angular/router';
import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { AssociationComponent } from '../pages/association/association.component';
import { CreateLotteryComponent } from '../pages/create-lottery/create-lottery.component';
import { LotteryStartComponent } from '../pages/lottery-start/lottery-start.component';
import { MembersComponent } from '../pages/members/members.component';
import { WinnersComponent } from '../pages/winners/winners.component';

export const MaterialRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user/artitems',
        pathMatch: 'full',
    },
    {
        path: 'user/artitems',
        component: ArtItemsComponent,
    },
    {
        path: 'user/association',
        component: AssociationComponent,
    },
    {
        path: 'user/lottery-start',
        component: LotteryStartComponent,
    },
    {
        path: 'user/winners',
        component: WinnersComponent,
    },
    {
        path: 'user/members',
        component: MembersComponent,
    },
    {
        path: 'user/create-lottery',
        component: CreateLotteryComponent,
    },
    {
        path: 'admin/artitems',
        component: ArtItemsComponent,
    },
    {
        path: 'admin/association',
        component: AssociationComponent,
    },
    {
        path: 'admin/lottery-start',
        component: LotteryStartComponent,
    },
    {
        path: 'admin/winners',
        component: WinnersComponent,
    },
    {
        path: 'admin/members',
        component: MembersComponent,
    },
    {
        path: 'admin/create-lottery',
        component: CreateLotteryComponent,
    },
];
