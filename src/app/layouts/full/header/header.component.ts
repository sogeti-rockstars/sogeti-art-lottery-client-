import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
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

    constructor(public app: AppComponent, private router: Router, private _focusMonitor: FocusMonitor, lotteryService: LotteryService) {
        lotteryService.lotteryChanged.subscribe((lott) => (this.currLotteryTitle = lott.title));
    }

    ngAfterViewInit(): void {
        this._focusMonitor.stopMonitoring(document.getElementById('toggleSide')!);
    }

    public doAction(menuitem: MenuItem, event: MouseEvent) {
        event.stopImmediatePropagation();
        this.router.navigateByUrl(menuitem.route);
    }

    public getMenuItems() {
        return menuItems.filter(
            (item) => item.limitedTo == '' || (item.limitedTo == 'user' && !this.app.isAdmin) || (item.limitedTo == 'admin' && this.app.isAdmin)
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
        route: 'appmembers',
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
        route: '',
        label: 'Logga ut',
        icon: '',
        cls: 'header-buttons header-btn-logout',
        limitedTo: 'admin',
        action: '',
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
