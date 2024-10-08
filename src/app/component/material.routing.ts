import { Routes } from '@angular/router';
import { ArtItemSecondComponent } from '../pages/art-item-second/art-item-second.component';
import { ArtItemsComponent } from '../pages/art-items/art-items.component';
import { AssociationComponent } from '../pages/association/association.component';
import { CreateLotteryComponent } from '../pages/create-lottery/create-lottery.component';
import { EditLotteryComponent } from '../pages/edit-lottery/edit-lottery.component';
import { FlowComponent } from '../pages/flow/flow.component';
import { AboutComponent } from '../pages/info/about.component';
import { LoginComponent } from '../pages/login/login.component';
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
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'user/artitems',
        component: ArtItemsComponent,
    },
    {
        path: 'user/artitemSecond',
        component: ArtItemSecondComponent,
    },
    {
        path: 'user/association',
        component: AssociationComponent,
    },
    {
        path: 'user/about',
        component: AboutComponent,
    },
    {
        path: 'user/flow',
        component: FlowComponent,
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
        path: 'admin/artitemSecond',
        component: ArtItemSecondComponent,
    },
    {
        path: 'admin/association',
        component: AssociationComponent,
    },
    {
        path: 'admin/about',
        component: AboutComponent,
    },
    {
        path: 'admin/flow',
        component: FlowComponent,
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
    {
        path: 'admin/edit-lottery/:id',
        component: EditLotteryComponent,
    },
];
