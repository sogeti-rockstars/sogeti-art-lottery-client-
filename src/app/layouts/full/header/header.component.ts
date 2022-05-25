import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { LotteryService } from 'src/app/service/lottery.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class AppHeaderComponent implements AfterViewInit {
    @Output() sidebarVisibleClicked = new EventEmitter<void>();
    @Input() currLotteryTitle!: string;

    public readonly menuItems = menuItems;

    constructor(
        public app: AppComponent,
        private router: Router,
        private authService: AuthService,
        private _focusMonitor: FocusMonitor,
        lotteryService: LotteryService
    ) {
        lotteryService.lotteryChanged.subscribe((lott) => (this.currLotteryTitle = lott.title));
    }

    ngAfterViewInit(): void {
        this._focusMonitor.stopMonitoring(document.getElementById('toggleSide')!);
    }

    public doAction(menuitem: MenuItem, event: MouseEvent) {
        event.stopImmediatePropagation();
        console.log(this.authService.isAdmin);
        if (menuitem.action === 'showRoute') {
            let url = this.authService.isAdmin ? 'admin/' + menuitem.route : 'user/' + menuitem.route;
            this.router.navigateByUrl(url);
        } else if (menuitem.action == 'loginOrLogout') {
            let url = this.router.url.replace(/(admin|user)/, menuitem.route);
            console.log(url);
            this.router.navigateByUrl(url);
        } else throw new Error('Unknown action was given!');
    }

    public getMenuItems() {
        return menuItems.filter(
            (item) => item.limitedTo == '' || (item.limitedTo == 'user' && !this.authService.isAdmin) || (item.limitedTo == 'admin' && this.authService.isAdmin)
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
    },
    {
        route: 'winners',
        label: 'Vinnare',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: '',
        action: 'showRoute',
    },
    {
        route: 'association',
        label: 'Om föreningen',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: 'user',
        action: 'showRoute',
    },
    {
        route: 'members',
        label: 'Medlemmar',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: 'admin',
        action: 'showRoute',
    },
    {
        route: 'lottery-start',
        label: 'Starta lotteri',
        icon: '',
        cls: 'header-buttons route-button',
        limitedTo: 'admin',
        action: 'showRoute',
    },
    {
        route: 'user',
        label: 'Logga ut',
        icon: '',
        cls: 'header-buttons header-btn-logout',
        limitedTo: 'admin',
        action: 'loginOrLogout',
    },
    {
        route: 'admin',
        label: 'Logga in',
        icon: '',
        cls: 'header-buttons header-btn-logout',
        limitedTo: 'user',
        action: 'loginOrLogout',
    },
];

export interface MenuItem {
    route: string;
    label: string;
    icon: string;
    cls: string;
    limitedTo: string /*admin, user or blank (=not limited to any user group)*/;
    action: string;
}
