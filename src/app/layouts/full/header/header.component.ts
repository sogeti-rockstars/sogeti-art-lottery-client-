import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Lottery } from 'src/app/model/lottery';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements AfterViewInit {
    @Output() sidebarVisibleClicked = new EventEmitter<void>();

    currLotteryTitle!: string;
    lotteries!: Lottery[];
    currIndex!: number;

    public readonly menuItems = menuItems;

    constructor(
        public app: AppComponent,
        private router: Router,
        public authService: AuthService,
        private _focusMonitor: FocusMonitor,
        public lotteryService: LotteryService
    ) {
        lotteryService.lotteryChanged.subscribe((lott) => {
            this.currLotteryTitle = lott.title;
            lotteryService.getLotteriesSummary().subscribe((lotts) => (this.lotteries = lotts));
        });
    }

    ngAfterViewInit(): void {
        this._focusMonitor.stopMonitoring(document.getElementById('toggleSide')!);
    }

    public setCurrIndex(index: number) {
        this.currIndex = index;
    }

    public doAction(menuitem: MenuItem, event: MouseEvent) {
        event.stopImmediatePropagation();
        switch (menuitem.action) {
            case 'showRoute':
                let url = this.authService.authenticated ? 'admin/' + menuitem.route : 'user/' + menuitem.route;
                this.router.navigateByUrl(url);
                break;
            case 'login':
                this.router.navigateByUrl('/login?from=' + this.router.url.split('/').slice(-1));
                this.router.setUpLocationChangeListener;
                break;
            case 'logout':
                this.authService.logout();
                break;
            case 'nothing':
                break;
        }
    }

    public getMenuItems() {
        return menuItems.filter(
            (item) =>
                item.limitedTo == '' ||
                (item.limitedTo == 'user' && !this.authService.authenticated) ||
                (item.limitedTo == 'admin' && this.authService.authenticated)
        );
    }
}

const menuItems: MenuItem[] = [
    {
        route: 'artitems',
        label: 'Konstverk',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: '',
        action: 'showRoute',
        subMenuItems: [],
    },
    {
        route: 'winners',
        label: 'Vinnare',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: '',
        action: 'showRoute',
        subMenuItems: [],
    },
    {
        route: '',
        label: 'Om oss',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: '',
        action: 'nothing',
        subMenuItems: [
            {
                route: 'association',
                label: 'Styrelsen',
                icon: '',
                cls: 'header-buttons route-button',
                limitedTo: '',
                action: 'showRoute',
            },
            {
                route: 'flow',
                label: 'Flöde',
                icon: '',
                cls: 'header-buttons route-button',
                limitedTo: '',
                action: 'showRoute',
            },
            {
                route: 'about',
                label: 'Info',
                icon: '',
                cls: 'header-buttons route-button',
                limitedTo: '',
                action: 'showRoute',
            },
        ],
    },
    {
        route: 'members',
        label: 'Medlemmar',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: 'admin',
        action: 'showRoute',
        subMenuItems: [],
    },
    {
        route: 'lottery-start',
        label: 'Starta lotteri',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: 'admin',
        action: 'showRoute',
        subMenuItems: [],
    },
    {
        route: 'user',
        label: 'Logga ut',
        icon: 'person',
        cls: 'header-buttons login-out-button',
        limitedTo: 'admin',
        subMenuItems: [],
        action: 'logout',
    },
    {
        route: 'admin',
        label: 'Logga in',
        icon: 'person',
        cls: 'header-buttons login-out-button',
        limitedTo: 'user',
        subMenuItems: [],
        action: 'login',
    },
];

export interface MenuItem {
    route: string;
    label: string;
    icon: string;
    cls: string;
    limitedTo: string /*admin, user or blank (=not limited to any user group)*/;
    action: string;
    subMenuItems: any[];
}
